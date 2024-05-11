from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app) 

GOOGLE_API_KEY = "AIzaSyC1aia4QkGZYq_EXoHpZ82FpDaLiq2ukI0"
genai.configure(api_key=GOOGLE_API_KEY)

generation_config = {
    "candidate_count": 1,
    "temperature": 1,
}

safety_settings = {
    "HARASSMENT": "BLOCK_NONE",
    "HATE": "BLOCK_NONE",
    "SEXUAL": "BLOCK_NONE",
    "DANGEROUS": "BLOCK_NONE"
}

model = genai.GenerativeModel(
    model_name="gemini-1.0-pro-latest",
    generation_config=generation_config,
    safety_settings=safety_settings
)

chat_history = []

@app.route("/chat", methods=["POST"])
def chat():
    global chat_history

    user_message = request.json["message"]

    chat_history.append(user_message)

    response = model.generate_content(chat_history)

    chat_history.append(response.text)

    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
