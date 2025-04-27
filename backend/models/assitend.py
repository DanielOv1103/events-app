from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class Assistant(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    id_event: str
    id_person: str
    id_inscription: str
    is_assistant: bool
    created_at: datetime

    class Config:
        validate_by_name = True
        allow_population_by_field_name = True