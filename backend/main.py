from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from src.schemas import TodoResponseSchema, UserSchema, UserSignInSchema
import jwt
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


app = FastAPI()

templates = Jinja2Templates(directory="dist")
app.mount("/static", StaticFiles(directory="dist"), name="static")

origins = [
    "http://localhost:5173",
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


users = [{
  "username": "test_user",
  "email": "test@test.sh",
  "password": "123",
  'todos': [
    { "id": 1, "task": 'Buy groceries', "due": '2025-07-01', 'priority': 'low' },
    { "id": 2, "task": 'Finish React todo app', "due": '2025-07-02', 'priority': 'high' },
    { "id": 3, "task": 'Call mom', "due": '2025-07-03', 'priority': 'medium' },
    { "id": 4, "task": 'Book dentist appointment', "due": '2025-07-04', "priority": 'low' },
    { "id": 5, "task": 'Read 10 pages of a book called who wants to be a believer', "due": '2025-07-05', 'priority': 'medium' },
  ]
}]

@app.get("/")
async def home(request: Request):
	return templates.TemplateResponse("index.html",{"request":request})

@app.post("/signup", response_model=UserSchema)
def create_user(user: UserSchema):
    if any(u['email'] == user.email for u in users):
        raise ValueError("Email already exists")
    user = user.dict()
    user['todos'] = [
        {"id": 1, "task": "Welcome to your Todo List!", "due": '2025-07-01', 'priority': 'low' },
    ]
    users.append(user)
    return user
@app.post("/signin")
def sign_in(user: UserSignInSchema):
    for u in users:
        if u['email'] == user.email and u['password'] == user.password:
            payload = {
                "username": u['username'],
                "email": u['email']
            }
            encoded_jwt = jwt.encode(payload, "secret", algorithm="HS256")
            return {"token": encoded_jwt,
                    'email': user.email,
                    "username": u['username']}
    raise ValueError("Invalid email or password")
# eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RfbmFzaXIiLCJlbWFpbCI6InNwYXRpYWxuYXNpckBnbWFpbC5jb20ifQ.vzc0kNf7ui_9OgU28T8ELr0Lkt_Sw6yHX8D5hMu6q1I
@app.get("/todos", response_model=list[TodoResponseSchema])
def read_root(token: str = None):
    if token:
        try:
            decoded_jwt = jwt.decode(token, "secret", algorithms=["HS256"])
            username = decoded_jwt.get("username")
            user_todos = next((u['todos'] for u in users if u['username'] == username), [])
            return user_todos
        except jwt.ExpiredSignatureError:
            raise ValueError("Token has expired")
        except jwt.InvalidTokenError:
            raise ValueError("Invalid token")
    return []

@app.get("/users", response_model=list[UserSchema])
def read_users():
    return users