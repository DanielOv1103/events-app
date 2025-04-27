from bson import ObjectId
from typing import List, Optional
from models.attenden import Attendee
import db

def list_attendees() -> List[Attendee]:
    attendees: List[Attendee] = []
    for doc in db.db["attendees"].find():
        doc["_id"] = str(doc["_id"])
        del doc["_id"]
        attendees.append(Attendee(**doc))
    return attendees

def get_attendee(attendee_id: str) -> Optional[Attendee]:
    doc = db.db["attendees"].find_one({"_id": ObjectId(attendee_id)})
    if doc:
        doc["id"] = str(doc["_id"])                  
        del doc["_id"]                               
        return Attendee(**doc)                             
    return None

def create_attendee(attendee_data: dict) -> Attendee:
    try:
        if isinstance(attendee_data, Attendee):
            data = attendee_data.dict(by_alias=True, exclude={"id"})
        else:
            data = attendee_data.copy()
            data.pop("id", None)
        
        result = db.db["attendees"].insert_one(data)
        return get_attendee(str(result.inserted_id))
    
    except Exception as e:
        print(f"Error creating attendee: {e}")
        raise HTTPException(status_code=500, detail="Error creating attendee")

def delete_attendee(attendee_id: str):
    try:
        result = db.db["attendees"].delete_one({"_id": ObjectId(attendee_id)})
        if result.deleted_count == 0:
            return None  # No se encontró el evento para eliminar
        return True  # El evento fue eliminado correctamente
    except Exception as e:
        # Manejo de excepciones para capturar cualquier error durante la eliminación
        print(f"Error eliminando attendee: {e}")
        return None

def update_attendee(attendee_id: str, update_data: dict) -> bool:
    """Update an existing attendee"""
    try:
        _id = ObjectId(attendee_id)
        
        # Remove id if present in update data
        update_data.pop("id", None)
        update_data.pop("_id", None)
        
        result = db.db["attendees"].update_one(
            {"_id": _id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return False
        return True
    
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid attendee ID")
    except Exception as e:
        print(f"Error updating attendee: {e}")
        raise HTTPException(status_code=500, detail="Error updating attendee")  