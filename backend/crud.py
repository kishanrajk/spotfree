from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
import uuid

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        email=user.email,
        phone=user.phone,
        hashed_password=hashed_password,
        full_name=user.full_name,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_parking_lots(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ParkingLot).offset(skip).limit(limit).all()

def create_parking_lot(db: Session, lot: schemas.ParkingLotBase, owner_id: int):
    db_lot = models.ParkingLot(**lot.dict(), owner_id=owner_id)
    db.add(db_lot)
    db.commit()
    db.refresh(db_lot)
    
    # Automatically create slots
    for i in range(1, lot.total_slots + 1):
        db_slot = models.Slot(lot_id=db_lot.id, slot_number=f"S-{i}")
        db.add(db_slot)
    
    db.commit()
    return db_lot

def create_booking(db: Session, booking: schemas.BookingCreate, user_id: int):
    # Calculate price dummy for now
    total_price = 100.0 # Standard flat rate for MVP
    qr_hash = str(uuid.uuid4())
    
    db_booking = models.Booking(
        **booking.dict(),
        user_id=user_id,
        total_price=total_price,
        qr_code_hash=qr_hash,
        status=models.BookingStatus.PENDING
    )
    db.add(db_booking)
    # Lock slot
    slot = db.query(models.Slot).filter(models.Slot.id == booking.slot_id).first()
    if slot:
        slot.status = "Occupied"
    
    db.commit()
    db.refresh(db_booking)
    return db_booking
