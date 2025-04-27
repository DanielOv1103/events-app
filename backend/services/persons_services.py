from bson import ObjectId
from typing import List, Optional
from models.person import Person
import db

def list_persons() -> List[Person]:
    persons: List[Person] = []
    for doc in db.db["persons"].find():
        doc["_id"] = str(doc["_id"])
        persons.append(Person(**doc))
    return persons

def get_person(person_id: str) -> Optional[Person]:
    doc = db.db["persons"].find_one({"_id": ObjectId(person_id)})
    if doc:
        doc["id"] = str(doc["_id"])                                           
        return Person(**doc)                             
    return None

def create_person(person_data: dict) -> Person:
    try:
        if isinstance(person_data, Person):
            data = person_data.dict(by_alias=True, exclude={"id"})
        else:
            data = person_data.copy()
            data.pop("id", None)
        
        result = db.db["persons"].insert_one(data)
        return get_person(str(result.inserted_id))
    
    except Exception as e:
        print(f"Error creating person: {e}")
        raise HTTPException(status_code=500, detail="Error creating person")

def delete_person(person_id: str):
    try:
        result = db.db["persons"].delete_one({"_id": ObjectId(person_id)})
        if result.deleted_count == 0:
            return None  # No se encontró el evento para eliminar
        return True  # El evento fue eliminado correctamente
    except Exception as e:
        # Manejo de excepciones para capturar cualquier error durante la eliminación
        print(f"Error eliminando evento: {e}")
        return None

def update_person(person_id: str, update_data: dict) -> bool:
    """Update an existing person"""
    try:
        _id = ObjectId(person_id)
        
        # Remove id if present in update data
        update_data.pop("id", None)
        update_data.pop("_id", None)
        
        result = db.db["persons"].update_one(
            {"_id": _id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return False
        return True
    
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid person ID")
    except Exception as e:
        print(f"Error updating person: {e}")
        raise HTTPException(status_code=500, detail="Error updating person")

