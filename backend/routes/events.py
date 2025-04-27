from fastapi import APIRouter, HTTPException
from models.event import Event
from services.events_services import list_events, get_event, create_event, delete_event, update_event

router = APIRouter()

@router.get("/", response_model=list[Event])
def list_events_route():
    events = list_events()
    return events

@router.get("/{event_id}", response_model=Event)
def get_event_route(event_id: str):
    event = get_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return event

@router.post("/", response_model=Event)
def create_event_route(event: Event):
    new_event = create_event(event)
    if not new_event:
        raise HTTPException(status_code=500, detail="Error al crear evento")
    return new_event

@router.delete("/{event_id}", response_model=dict)
def delete_event_route(event_id: str):
    deleted = delete_event(event_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return {"status": "deleted"}

@router.patch("/{event_id}", response_model=dict)
def update_event_route(event_id: str, event_data: Event):
    success = update_event(event_id, event_data.dict(exclude_unset=True))  # exclude_unset evita sobrescribir con campos vacíos
    if not success:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return {"status": "success"}
