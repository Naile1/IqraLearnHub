# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
import json

import os
from dotenv import load_dotenv
load_dotenv()
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


app = FastAPI()

class AskRequest(BaseModel):
    age: int
    subject: str
    question: str

def generate_response(age, subject, question):
    try:
        if age <= 12:
            level = "Use simple language..."
        else:
            level = "Use more advanced explanation..."

        prompt = f"""
You are IqraLearn Hub, an AI tutor for Muslim students aged 10–16.

Subject: {subject}
Student Age: {age}
Question: {question}

Your task:
1. Give an age‑appropriate explanation based on the student's age.
2. Include Islamic values where relevant.
3. Generate 2 short quiz questions.
4. Return ONLY valid JSON. No extra text.

Return JSON like this:
{{
  "answer": "string",
  "quiz": ["question 1", "question 2"]
}}
"""

        print("Prompt sent to OpenAI:")
        print(prompt)

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        ai_text = response.choices[0].message.content
        print("✅ AI Response:")
        print(ai_text)

        import json
        result = json.loads(ai_text)
        return result

    except Exception as e:
        print("🔥 Error in generate_response:", str(e))
        return {
            "answer": "Sorry, something went wrong with the AI.",
            "quiz": []
        }

@app.post("/ask")
def ask(req: AskRequest):
    result = generate_response(req.age, req.subject, req.question)
    return result
