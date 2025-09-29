from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from .features import extract_features
from .model import predict

app = FastAPI()

# Configure CORS for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

@app.post("/analyze")
def analyze_url(request: URLRequest):
    features = extract_features(request.url)
    prediction = predict(features)
    if prediction == 1:
        response = {
            "verdict": "Malicious",
            "riskScore": 95,
            "details": ["This URL exhibits characteristics of a malicious link."]
        }
    else:
        response = {
            "verdict": "Safe",
            "riskScore": 10,
            "details": ["This URL appears to be safe."]
        }
    return response
