from bson import ObjectId
from typing import List, Optional
from models.event import Event
from fastapi import HTTPException
from datetime import datetime
import db


def calculate_total_capacity(distributions: List[dict]) -> int:
    total = 0
    for d in distributions:
        capacity = d.get("capacity", 0)
        ocuped = d.get("ocuped", 0)
        if ocuped > capacity:
            raise HTTPException(
                status_code=400,
                detail=f"La distribución '{d.get('name', 'Sin nombre')}' tiene más ocupados ({ocuped}) que capacidad ({capacity})."
            )
        total += capacity
    return total

def list_events() -> List[Event]:
    events: List[Event] = []
    for doc in db.db["events"].find():
        # Convertir ObjectId a string y mantenerlo en el documento
        doc["_id"] = str(doc["_id"])
        events.append(Event(**doc))
    return events

def get_event(event_id: str) -> Optional[Event]:
    doc = db.db["events"].find_one({"_id": ObjectId(event_id)})
    if doc:
        doc["_id"] = str(doc["_id"])                                              
        return Event(**doc)                             
    return None

def create_event(event_data: dict) -> Event:
    try:
        if isinstance(event_data, Event):
            data = event_data.dict(by_alias=True, exclude={"id"})
        else:
            data = event_data.copy()
            data.pop("id", None)

        data["total_capacity"] = calculate_total_capacity(data.get("distribution", []))
        
        result = db.db["events"].insert_one(data)
        return get_event(str(result.inserted_id))
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error creating event: {e}")
        raise HTTPException(status_code=500, detail="Error creating event")

def delete_event(event_id: str):
    try:
        result = db.db["events"].delete_one({"_id": ObjectId(event_id)})
        if result.deleted_count == 0:
            return None  # No se encontró el evento para eliminar
        return True  # El evento fue eliminado correctamente
    except Exception as e:
        # Manejo de excepciones para capturar cualquier error durante la eliminación
        print(f"Error eliminando evento: {e}")
        return None

def update_event(event_id: str, update_data: dict) -> bool:
    try:
        _id = ObjectId(event_id)
        
        update_data.pop("id", None)
        update_data.pop("_id", None)

        # Validar distribución si se incluye
        if "distribution" in update_data:
            update_data["total_capacity"] = calculate_total_capacity(update_data["distribution"])
        
        # Actualizar campo de fecha
        update_data["updated_at"] = datetime.utcnow()

        result = db.db["events"].update_one(
            {"_id": _id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return False
        return True

    except HTTPException:
        raise
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid event ID")
    except Exception as e:
        print(f"Error updating event: {e}")
        raise HTTPException(status_code=500, detail="Error updating event")