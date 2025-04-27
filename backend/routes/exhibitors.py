from fastapi import APIRouter, HTTPException
from models.exhibitor import Exhibitor
from services.exhibitors_services import list_exhibitors, get_exhibitor, create_exhibitor, delete_exhibitor, update_exhibitor

router = APIRouter()

@router.get("/", response_model=list[Exhibitor])
def list_exhibitors_route():
    exhibitors = list_exhibitors()
    return exhibitors

@router.get("/{exhibitor_id}", response_model=Exhibitor)
def get_exhibitor_route(exhibitor_id: str):
    exhibitor = get_exhibitor(exhibitor_id)
    if not exhibitor:
        raise HTTPException(status_code=404, detail="Exhibitor no encontrado")
    return exhibitor

@router.post("/", response_model=Exhibitor)
def create_exhibitor_route(exhibitor: Exhibitor):
    new_exhibitor = create_exhibitor(exhibitor)
    if not new_exhibitor:
        raise HTTPException(status_code=500, detail="Error al crear exhibitor")
    return new_exhibitor

@router.delete("/{exhibitor_id}", response_model=dict)
def delete_exhibitor_route(exhibitor_id: str):
    deleted = delete_exhibitor(exhibitor_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Exhibitor no encontrado")
    return {"status": "deleted"}

@router.patch("/{exhibitor_id}", response_model=dict)
def update_exhibitor_route(exhibitor_id: str, exhibitor_data: Exhibitor):
    success = update_exhibitor(exhibitor_id, exhibitor_data.dict(exclude_unset=True))  # exclude_unset evita sobrescribir con campos vacíos
    if not success:
        raise HTTPException(status_code=404, detail="Exhibitor no encontrado")
    return {"status": "success"}