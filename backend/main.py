from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import crud, models, schemas, auth, database
from .database import get_db

app = FastAPI(title="SpotFree API", version="1.0.0")

@app.get("/")
async def root():
    return {"message": "Welcome to SpotFree API"}

@app.post("/users/", response_model=schemas.User)
def create_customer(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/parking/", response_model=list[schemas.ParkingLot])
def read_parking_lots(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    lots = crud.get_parking_lots(db, skip=skip, limit=limit)
    return lots

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
