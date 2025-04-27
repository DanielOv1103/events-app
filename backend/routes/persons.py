from fastapi import APIRouter, HTTPException
from models.person import Person
from services.persons_services import list_persons, get_person, create_person, delete_person, update_person

router = APIRouter()

@router.get("/", response_model=list[Person])
def list_persons_route():
    persons = list_persons()
    return persons

@router.get("/{person_id}", response_model=Person)
def get_person_route(person_id: str):
    person = get_person(person_id)
    if not person:
        raise HTTPException(status_code=404, detail="Person no encontrado")
    return person

@router.post("/", response_model=Person)
def create_person_route(person: Person):
    new_person = create_person(person)
    if not new_person:
        raise HTTPException(status_code=500, detail="Error al crear persona")
    return new_person

@router.delete("/{person_id}", response_model=dict)
def delete_person_route(person_id: str):
    deleted = delete_person(person_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Person no encontrado")
    return {"status": "deleted"}

@router.patch("/{person_id}", response_model=dict)
def update_person_route(person_id: str, person_data: Person):
    success = update_person(person_id, person_data.dict(exclude_unset=True))  # exclude_unset evita sobrescribir con campos vacíos
    if not success:
        raise HTTPException(status_code=404, detail="Person no encontrado")
    return {"status": "success"}