from pydantic import BaseModel, Field, EmailStr, constr
from datetime import datetime
from typing import Optional

class Exhibitor(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    last_name: str
    email: EmailStr
    bio: str
    category_exhibitor: str
    phone: constr(min_length=9, max_length=9)
    address: str
    city: str
    country: str
    image: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        validate_by_name = True
        allow_population_by_field_name = True