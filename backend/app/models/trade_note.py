from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base

class TradeNote(Base):
    __tablename__ = "trade_notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    strategy_type = Column(String, nullable=False)
    risk_level = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
