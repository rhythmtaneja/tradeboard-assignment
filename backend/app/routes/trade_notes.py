from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.trade_note import TradeNote
from app.models.user import User
from app.schemas.trade_note import TradeNoteCreate, TradeNoteResponse
from app.core.jwt_dependency import get_current_user
from app.dependencies import get_db


router = APIRouter(prefix="/notes", tags=["Trade Notes"])



@router.post("/", response_model=TradeNoteResponse)
def create_note(
    note: TradeNoteCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_note = TradeNote(
        **note.dict(),
        user_id=current_user.id
    )
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note

@router.get("/", response_model=list[TradeNoteResponse])
def get_notes(
    search: str | None = None,
    risk: str | None = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(TradeNote).filter(TradeNote.user_id == current_user.id)

    if search:
        query = query.filter(TradeNote.title.ilike(f"%{search}%"))

    if risk:
        query = query.filter(TradeNote.risk_level == risk)

    return query.order_by(TradeNote.created_at.desc()).all()

@router.put("/{note_id}", response_model=TradeNoteResponse)
def update_note(
    note_id: int,
    updated_note: TradeNoteCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    note = db.query(TradeNote).filter(
        TradeNote.id == note_id,
        TradeNote.user_id == current_user.id
    ).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    for key, value in updated_note.dict().items():
        setattr(note, key, value)

    db.commit()
    db.refresh(note)
    return note

@router.delete("/{note_id}")
def delete_note(
    note_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    note = db.query(TradeNote).filter(
        TradeNote.id == note_id,
        TradeNote.user_id == current_user.id
    ).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"message": "Note deleted successfully"}

