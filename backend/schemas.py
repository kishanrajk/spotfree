from pydantic import BaseModel, EmailStr, HttpUrl
from typing import List, Optional
from datetime import datetime
from .models import UserRole, BookingStatus

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: str
    role: UserRole = UserRole.USER

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Parking Lot Schemas
class ParkingLotBase(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float
    total_slots: int
    ev_charging: bool = False
    images: List[str] = []

class ParkingLot(ParkingLotBase):
    id: int
    owner_id: int
    security_rating: float
    created_at: datetime

    class Config:
        from_attributes = True

# Slot Schemas
class SlotBase(BaseModel):
    slot_number: str
    type: str = "Standard"
    status: str = "Available"

class Slot(SlotBase):
    id: int
    lot_id: int

    class Config:
        from_attributes = True

# Booking Schemas
class BookingBase(BaseModel):
    slot_id: int
    start_time: datetime
    end_time: datetime

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    user_id: int
    total_price: float
    status: BookingStatus
    qr_code_hash: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

# Payment Schemas
class PaymentBase(BaseModel):
    amount: float
    gateway: str

class Payment(PaymentBase):
    id: int
    booking_id: int
    transaction_id: str
    status: str
    timestamp: datetime

    class Config:
        from_attributes = True
