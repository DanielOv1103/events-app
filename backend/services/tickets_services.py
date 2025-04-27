from bson import ObjectId
from typing import List, Optional
from models.ticket import Ticket
import db

def list_tickets() -> List[Ticket]:
    tickets: List[Ticket] = []
    for doc in db.db["tickets"].find():
        doc["_id"] = str(doc["_id"])
        del doc["_id"]
        tickets.append(Ticket(**doc))
    return tickets

def get_ticket(ticket_id: str) -> Optional[Ticket]:
    doc = db.db["tickets"].find_one({"_id": ObjectId(ticket_id)})
    if doc:
        doc["id"] = str(doc["_id"])                  
        del doc["_id"]                               
        return Ticket(**doc)                             
    return None

def create_ticket(ticket_data: dict) -> Ticket:
    try:
        if isinstance(ticket_data, Ticket):
            data = ticket_data.dict(by_alias=True, exclude={"id"})
        else:
            data = ticket_data.copy()
            data.pop("id", None)
        
        result = db.db["tickets"].insert_one(data)
        return get_ticket(str(result.inserted_id))
    
    except Exception as e:
        print(f"Error creating ticket: {e}")
        raise HTTPException(status_code=500, detail="Error creating ticket")

def delete_ticket(ticket_id: str):
    try:
        result = db.db["tickets"].delete_one({"_id": ObjectId(ticket_id)})
        if result.deleted_count == 0:
            return None  # No se encontró el evento para eliminar
        return True  # El evento fue eliminado correctamente
    except Exception as e:
        # Manejo de excepciones para capturar cualquier error durante la eliminación
        print(f"Error eliminando ticket: {e}")
        return None

def update_ticket(ticket_id: str, update_data: dict) -> bool:
    """Update an existing ticket"""
    try:
        _id = ObjectId(ticket_id)
        
        # Remove id if present in update data
        update_data.pop("id", None)
        update_data.pop("_id", None)
        
        result = db.db["tickets"].update_one(
            {"_id": _id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return False
        return True
    
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid ticket ID")
    except Exception as e:
        print(f"Error updating ticket: {e}")
        raise HTTPException(status_code=500, detail="Error updating ticket")
