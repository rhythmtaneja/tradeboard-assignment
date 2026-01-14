from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import auth, profile, trade_notes

app = FastAPI(title="TradeBoard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(trade_notes.router)


@app.get("/")
def root():
    return {"message": "TradeBoard backend is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

