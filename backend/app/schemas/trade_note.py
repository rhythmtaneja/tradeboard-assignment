from pydantic import BaseModel
from datetime import datetime

class TradeNoteCreate(BaseModel):
    title: str
    strategy_type: str
    risk_level: str
    description: str | None = None

class TradeNoteResponse(BaseModel):
    id: int
    title: str
    strategy_type: str
    risk_level: str
    description: str | None
    created_at: datetime

    class Config:
        from_attributes = True
