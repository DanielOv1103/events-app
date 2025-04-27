from bson import ObjectId
from typing import List, Optional
from models.payment import Payment
import db

def list_payments() -> List[Payment]:
    payments: List[Payment] = []
    for doc in db.db["payments"].find():
        doc["_id"] = str(doc["_id"])
        del doc["_id"]
        payments.append(Payment(**doc))
    return payments

def get_payment(payment_id: str) -> Optional[Payment]:
    doc = db.db["payments"].find_one({"_id": ObjectId(payment_id)})
    if doc:
        doc["id"] = str(doc["_id"])                  
        del doc["_id"]                               
        return Payment(**doc)                             
    return None

def create_payment(payment_data: dict) -> Payment:
    try:
        if isinstance(payment_data, Payment):
            data = payment_data.dict(by_alias=True, exclude={"id"})
        else:
            data = payment_data.copy()
            data.pop("id", None)
        
        result = db.db["payments"].insert_one(data)
        return get_payment(str(result.inserted_id))
    
    except Exception as e:
        print(f"Error creating payment: {e}")
        raise HTTPException(status_code=500, detail="Error creating payment")

def delete_payment(payment_id: str):
    try:
        result = db.db["payments"].delete_one({"_id": ObjectId(payment_id)})
        if result.deleted_count == 0:
            return None  # No se encontró el evento para eliminar
        return True  # El evento fue eliminado correctamente
    except Exception as e:
        # Manejo de excepciones para capturar cualquier error durante la eliminación
        print(f"Error eliminando payment: {e}")
        return None

def update_payment(payment_id: str, update_data: dict) -> bool:
    """Update an existing payment"""
    try:
        _id = ObjectId(payment_id)
        
        # Remove id if present in update data
        update_data.pop("id", None)
        update_data.pop("_id", None)
        
        result = db.db["payments"].update_one(
            {"_id": _id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return False
        return True
    
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid payment ID")
    except Exception as e:
        print(f"Error updating payment: {e}")
        raise HTTPException(status_code=500, detail="Error updating payment")   