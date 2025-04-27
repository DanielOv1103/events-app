from bson import ObjectId
from typing import List, Optional
from models.assitend import Assistant
import db

def list_assistants() -> List[Assistant]:
    assistants: List[Assistant] = []
    for doc in db.db["assistants"].find():
        doc["_id"] = str(doc["_id"])
        del doc["_id"]
        assistants.append(Assistant(**doc))
    return assistants

def get_assistant(assistant_id: str) -> Optional[Assistant]:
    doc = db.db["assistants"].find_one({"_id": ObjectId(assistant_id)})
    if doc:
        doc["id"] = str(doc["_id"])                  
        del doc["_id"]                               
        return Assistant(**doc)                             
    return None

def create_assistant(assistant_data: dict) -> Assistant:
    try:
        if isinstance(assistant_data, Assistant):
            data = assistant_data.dict(by_alias=True, exclude={"id"})
        else:
            data = assistant_data.copy()
            data.pop("id", None)
        
        result = db.db["assistants"].insert_one(data)
        return get_assistant(str(result.inserted_id))
    
    except Exception as e:
        print(f"Error creating assistant: {e}")
        raise HTTPException(status_code=500, detail="Error creating assistant")

def delete_assistant(assistant_id: str):
    try:
        result = db.db["assistants"].delete_one({"_id": ObjectId(assistant_id)})
        if result.deleted_count == 0:
            return None  # No se encontró el evento para eliminar
        return True  # El evento fue eliminado correctamente
    except Exception as e:
        # Manejo de excepciones para capturar cualquier error durante la eliminación
        print(f"Error eliminando assistant: {e}")
        return None

def update_assistant(assistant_id: str, update_data: dict) -> bool:
    """Update an existing assistant"""
    try:
        _id = ObjectId(assistant_id)
        
        # Remove id if present in update data
        update_data.pop("id", None)
        update_data.pop("_id", None)
        
        result = db.db["assistants"].update_one(
            {"_id": _id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return False
        return True
    
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid assistant ID")
    except Exception as e:
        print(f"Error updating assistant: {e}")
        raise HTTPException(status_code=500, detail="Error updating assistant")