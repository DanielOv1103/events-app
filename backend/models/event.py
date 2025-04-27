from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class Event(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    description: str
    date: datetime
    location: str
    address: str
    price: float
    image: str
    category: str
    tags: List[str]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        validate_by_name = True
        allow_population_by_field_name = True