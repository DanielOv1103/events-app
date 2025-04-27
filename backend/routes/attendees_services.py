from fastapi import APIRouter, HTTPException
from models.attenden import Attendee
from services.attendees_services import list_attendees, get_attendee, create_attendee, delete_attendee, update_attendee

router = APIRouter()

@router.get("/", response_model=list[Attendee])
def list_attendees_route():
    attendees = list_attendees()
    return attendees

@router.get("/{attendee_id}", response_model=Attendee)
def get_attendee_route(attendee_id: str):
    attendee = get_attendee(attendee_id)
    if not attendee:
        raise HTTPException(status_code=404, detail="Attendee no encontrado")
    return attendee

@router.post("/", response_model=Attendee)
def create_attendee_route(attendee: Attendee):
    new_attendee = create_attendee(attendee)
    if not new_attendee:
        raise HTTPException(status_code=500, detail="Error al crear attendee")
    return new_attendee

@router.delete("/{attendee_id}", response_model=dict)
def delete_attendee_route(attendee_id: str):
    deleted = delete_attendee(attendee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Attendee no encontrado")
    return {"status": "deleted"}

@router.patch("/{attendee_id}", response_model=dict)
def update_attendee_route(attendee_id: str, attendee_data: Attendee):
    success = update_attendee(attendee_id, attendee_data.dict(exclude_unset=True))  # exclude_unset evita sobrescribir con campos vacíos
    if not success:
        raise HTTPException(status_code=404, detail="Attendee no encontrado")
    return {"status": "success"}