from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class EventDistribution(BaseModel):
    name: str
    capacity: int
    ocuped: int
    price: float

class Event(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    id_exhibitor: List[str]
    name: str
    description: str
    date: datetime
    address: str
    image: str
    category: str
    total_capacity: int
    tags: List[str]
    distribution: List[EventDistribution]
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        validate_by_name = True
        allow_population_by_field_name = True