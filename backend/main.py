from fastapi import FastAPI
from db import connect_to_mongo, close_mongo_connection
from fastapi.middleware.cors import CORSMiddleware

from routes.events import router as events_router
from routes.persons import router as persons_router
from routes.tickets import router as tickets_router
from routes.exhibitors import router as exhibitors_router
from routes.assistends import router as assistends_router
from routes.payments import router as payments_router
from routes.attendees_services import router as attendees_router

app = FastAPI(
    title="Event App",
    version="0.2.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Añade el middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Esta forma es la más correcta:
@app.on_event("startup")
def startup_db_client():
    connect_to_mongo()

@app.on_event("shutdown")
def shutdown_db_client():
    close_mongo_connection()

# Rutas
app.include_router(events_router, prefix="/events", tags=["events"])
app.include_router(persons_router, prefix="/persons", tags=["persons"])
app.include_router(tickets_router, prefix="/tickets", tags=["tickets"])
app.include_router(exhibitors_router, prefix="/exhibitors", tags=["exhibitors"])
app.include_router(assistends_router, prefix="/assistends", tags=["assistends"])
app.include_router(payments_router, prefix="/payments", tags=["payments"])
app.include_router(attendees_router, prefix="/attendees", tags=["attendees"])
