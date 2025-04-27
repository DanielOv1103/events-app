from fastapi import APIRouter, HTTPException
from models.ticket import Ticket
from services.tickets_services import list_tickets, get_ticket, create_ticket, delete_ticket, update_ticket

router = APIRouter()

@router.get("/", response_model=list[Ticket])
def list_tickets_route():
    tickets = list_tickets()
    return tickets

@router.get("/{ticket_id}", response_model=Ticket)
def get_ticket_route(ticket_id: str):
    ticket = get_ticket(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    return ticket

@router.post("/", response_model=Ticket)
def create_ticket_route(ticket: Ticket):
    new_ticket = create_ticket(ticket)
    if not new_ticket:
        raise HTTPException(status_code=500, detail="Error al crear ticket")
    return new_ticket

@router.delete("/{ticket_id}", response_model=dict)
def delete_ticket_route(ticket_id: str):
    deleted = delete_ticket(ticket_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    return {"status": "deleted"}

@router.patch("/{ticket_id}", response_model=dict)
def update_ticket_route(ticket_id: str, ticket_data: Ticket):
    success = update_ticket(ticket_id, ticket_data.dict(exclude_unset=True))  # exclude_unset evita sobrescribir con campos vacíos
    if not success:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    return {"status": "success"}