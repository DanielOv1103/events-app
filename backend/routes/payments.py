from fastapi import APIRouter, HTTPException
from models.payment import Payment
from services.payments_services import list_payments, get_payment, create_payment, delete_payment, update_payment

router = APIRouter()

@router.get("/", response_model=list[Payment])
def list_payments_route():
    payments = list_payments()
    return payments

@router.get("/{payment_id}", response_model=Payment)
def get_payment_route(payment_id: str):
    payment = get_payment(payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment no encontrado")
    return payment

@router.post("/", response_model=Payment)
def create_payment_route(payment: Payment):
    new_payment = create_payment(payment)
    if not new_payment:
        raise HTTPException(status_code=500, detail="Error al crear payment")
    return new_payment

@router.delete("/{payment_id}", response_model=dict)
def delete_payment_route(payment_id: str):
    deleted = delete_payment(payment_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Payment no encontrado")
    return {"status": "deleted"}

@router.patch("/{payment_id}", response_model=dict)
def update_payment_route(payment_id: str, payment_data: Payment):
    success = update_payment(payment_id, payment_data.dict(exclude_unset=True))  # exclude_unset evita sobrescribir con campos vacíos
    if not success:
        raise HTTPException(status_code=404, detail="Payment no encontrado")
    return {"status": "success"}