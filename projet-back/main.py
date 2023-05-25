from fastapi import FastAPI, Request
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi.encoders import jsonable_encoder
import json


# class Item(BaseModel):
#     time: str
#     sonnerie:str
#     jours: [str]

app = FastAPI()
db_path = "alarms.db"

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_alarm_table():
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS alarms
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 time TEXT NOT NULL,
                 jours TEXT NOT NULL,
                 sonnerie TEXT NOT NULL,
                 active BOOLEAN)''')
    conn.commit()
    conn.close()

# Create DB if it doesn't exist
@app.on_event("startup")
def startup_event():
    create_alarm_table()
  
# Get all the alarms
@app.get("/get_alarms")
def get_alarms():
    conn = sqlite3.connect(db_path)
    conn.row_factory = lambda c, r: dict(zip([col[0] for col in c.description], r))
    c = conn.cursor()
    c.execute("SELECT * FROM alarms")
    alarms = c.fetchall()
    conn.close()
    if len(alarms):
        for alarm in alarms:
            alarm["jours"] = json.loads(alarm["jours"].decode('utf8'))
    return {"alarms": alarms}

# Create a new alarm, expect a request with a json body  (keys:"time", "sonnerie") and return the new alarm's id
@app.post("/create_alarm")
async def create_alarm(request:Request):
    da = await request.json()
    listToJson = json.dumps(da["jours"]).encode('utf8')
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("INSERT INTO alarms (time, jours, sonnerie, active) VALUES (?, ?, ?, ?)", (da["time"], listToJson, da["sonnerie"], True))
    conn.commit()
    alarm_id = c.lastrowid
    conn.close()
    return {"alarm_id": alarm_id}

# Update an alarm, expect a request with a json body (keys:"active", "jours", "alarm_id")
@app.put("/update_alarm")
async def update_alarm(request:Request):
    da = await request.json()
    listToJson = json.dumps(da["jours"]).encode('utf8')

    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("UPDATE alarms SET jours = ?, active = ? WHERE id = ?", (listToJson, da["active"], da["alarm_id"]))
    conn.commit()
    conn.close()
    return {"message": "Alarm updated"}

# Delete an alarm, expect the id of the alarm to delete as a query string parameter
@app.delete("/delete_alarm")
def delete_alarm(alarm_id: int):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("DELETE FROM alarms WHERE id = ?", (alarm_id,))
    conn.commit()
    conn.close()
    return {"message": "Alarm deleted"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)