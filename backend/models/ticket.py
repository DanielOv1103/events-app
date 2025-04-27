from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Ticket(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    id_event: str
    id_person: str
    number_ticket: str
    ticket_type: str
    price: float
    created_at: datetime
    updated_at: datetime
    
    class Config:
        validate_by_name = True
        allow_population_by_field_name = True