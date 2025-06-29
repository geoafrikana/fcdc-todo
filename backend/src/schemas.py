from pydantic import BaseModel, Field
from enum import Enum

class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class TodoSchema(BaseModel):
    task: str = Field(..., description="Description of the todo item")
    due: str = Field(..., description="Due date for the todo item in YYYY-MM-DD format")
    priority: PriorityEnum = Field(..., description="Priority of the todo item (low, medium, high)")

class TodoResponseSchema(BaseModel):
    id: int = Field(..., description="Unique identifier for the todo item")
    task: str = Field(..., description="Description of the todo item")
    due: str = Field(..., description="Due date for the todo item in YYYY-MM-DD format")
    priority: PriorityEnum = Field(..., description="Priority of the todo item (low, medium, high)")

class UserSchema(BaseModel):
    username: str = Field(..., description="Username of the user")
    email: str = Field(..., description="Email of the user")
    password: str = Field(..., description="Password of the user")

class UserSignInSchema(BaseModel):
    email: str = Field(..., description="Email of the user")
    password: str = Field(..., description="Password of the user")