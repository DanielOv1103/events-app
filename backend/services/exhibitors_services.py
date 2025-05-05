from bson import ObjectId
from typing import List, Optional
from models.exhibitor import Exhibitor
import db

def list_exhibitors() -> List[Exhibitor]:
    exhibitors: List[Exhibitor] = []
    for doc in db.db["exhibitors"].find():
        doc["_id"] = str(doc["_id"])
        exhibitors.append(Exhibitor(**doc))
    return exhibitors

def get_exhibitor(exhibitor_id: str) -> Optional[Exhibitor]:
    doc = db.db["exhibitors"].find_one({"_id": ObjectId(exhibitor_id)})
    if doc:
        doc["id"] = str(doc["_id"])                                                
        return Exhibitor(**doc)                             
    return None

def create_exhibitor(exhibitor_data: dict) -> Exhibitor:
    try:
        if isinstance(exhibitor_data, Exhibitor):
            data = exhibitor_data.dict(by_alias=True, exclude={"id"})
        else:
            data = exhibitor_data.copy()
            data.pop("id", None)
        
        result = db.db["exhibitors"].insert_one(data)
        return get_exhibitor(str(result.inserted_id))
    
    except Exception as e:
        print(f"Error creating exhibitor: {e}")
        raise HTTPException(status_code=500, detail="Error creating exhibitor")

def delete_exhibitor(exhibitor_id: str):
    try:
        result = db.db["exhibitors"].delete_one({"_id": ObjectId(exhibitor_id)})
        if result.deleted_count == 0:
            return None  # No se encontró el evento para eliminar
        return True  # El evento fue eliminado correctamente
    except Exception as e:
        # Manejo de excepciones para capturar cualquier error durante la eliminación
        print(f"Error eliminando exhibitor: {e}")
        return None

def update_exhibitor(exhibitor_id: str, update_data: dict) -> bool:
    """Update an existing exhibitor"""
    try:
        _id = ObjectId(exhibitor_id)
        
        # Remove id if present in update data
        update_data.pop("id", None)
        update_data.pop("_id", None)
        
        result = db.db["exhibitors"].update_one(
            {"_id": _id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return False
        return True
    
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid exhibitor ID")
    except Exception as e:
        print(f"Error updating exhibitor: {e}")
        raise HTTPException(status_code=500, detail="Error updating exhibitor")