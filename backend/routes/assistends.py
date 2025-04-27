from fastapi import APIRouter, HTTPException
from models.assitend import Assistant
from services.assitends_services import list_assistants, get_assistant, create_assistant, delete_assistant, update_assistant

router = APIRouter()

@router.get("/", response_model=list[Assistant])
def list_assistants_route():
    assistants = list_assistants()
    return assistants

@router.get("/{assistant_id}", response_model=Assistant)
def get_assistant_route(assistant_id: str):
    assistant = get_assistant(assistant_id)
    if not assistant:
        raise HTTPException(status_code=404, detail="Assistant no encontrado")
    return assistant

@router.post("/", response_model=Assistant)
def create_assistant_route(assistant: Assistant):
    new_assistant = create_assistant(assistant)
    if not new_assistant:
        raise HTTPException(status_code=500, detail="Error al crear assistant")
    return new_assistant

@router.delete("/{assistant_id}", response_model=dict)
def delete_assistant_route(assistant_id: str):
    deleted = delete_assistant(assistant_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Assistant no encontrado")
    return {"status": "deleted"}

@router.patch("/{assistant_id}", response_model=dict)
def update_assistant_route(assistant_id: str, assistant_data: Assistant):
    success = update_assistant(assistant_id, assistant_data.dict(exclude_unset=True))  # exclude_unset evita sobrescribir con campos vacíos
    if not success:
        raise HTTPException(status_code=404, detail="Assistant no encontrado")
    return {"status": "success"} 