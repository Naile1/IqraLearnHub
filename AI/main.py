# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Use OpenAI project key (sk-proj) or normal key (sk-)
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Initialize FastAPI
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root
@app.get("/")
def read_root():
    return {"message": "IqraLearnHub backend is live!"}

# Request model
class AskRequest(BaseModel):
    age: int
    subject: str
    question: str

# Generate AI response
def generate_response(age, subject, question):
    try:
        difficulty = (
            "Use simple language suitable for younger learners."
            if age <= 12 else
            "Explain in a more detailed and advanced manner suitable for teens."
        )

        prompt = f"""
You are IqraLearn Hub, an AI tutor for Muslim students aged 10–16.

Subject: {subject}
Student Age: {age}
Question: {question}

Your task:
1. Give an age-appropriate explanation based on the student's age.
2. Include Islamic values where relevant.
3. Generate *exactly* 2 short quiz questions.
4. Return ONLY valid JSON. No extra text.

Return JSON like this:
{{
  "answer": "string",
  "quiz": ["question 1", "question 2"]
}}

Follow difficulty rule:
{difficulty}
"""

        print("\n=== Prompt Sent to OpenAI ===")
        print(prompt)

        # 🔥 Updated API (required for sk-proj keys)
        response = client.chat.completions.create(
            model="gpt-4o-mini",        # USE NEW MODEL
            messages=[{"role": "user", "content": prompt}],
            temperature=0.6
        )

        ai_text = response.choices[0].message.content
        print("\n=== Raw AI Response ===")
        print(ai_text)

        # Convert JSON response
        result = json.loads(ai_text)
        return result

    except Exception as e:
        print("\n🔥 AI ERROR:", str(e))
        return {
            "answer": "Sorry, something went wrong. Please try again.",
            "quiz": []
        }

# POST /ask
@app.post("/ask")
def ask(req: AskRequest):
    return generate_response(req.age, req.subject, req.question)
