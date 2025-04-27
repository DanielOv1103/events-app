from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Payment(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    id_event: str
    id_ticket: str
    id_person: str
    payment_type: str
    created_at: datetime

    class Config:
        validate_by_name = True
        allow_population_by_field_name = True