from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app) 

# Configurar a chave da API do Google
GOOGLE_API_KEY = "AIzaSyC1aia4QkGZYq_EXoHpZ82FpDaLiq2ukI0"
genai.configure(api_key=GOOGLE_API_KEY)

# Configurações para geração de conteúdo
generation_config = {
    "candidate_count": 1,
    "temperature": 1,
}

# Configurações de segurança
safety_settings = {
    "HARASSMENT": "BLOCK_NONE",
    "HATE": "BLOCK_NONE",
    "SEXUAL": "BLOCK_NONE",
    "DANGEROUS": "BLOCK_NONE"
}

# Criar um modelo gerativo
model = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config=generation_config,
    safety_settings=safety_settings
)

# Inicializar histórico de conversa
chat_history = []

# Rota para processar mensagens do usuário
@app.route("/chat", methods=["POST"])
def chat():
    global chat_history  # Utilize o histórico global da conversa

    user_message = request.json["message"]

    # Adicionar mensagem do usuário ao histórico
    chat_history.append(user_message)

    # Gerar resposta usando o modelo gerativo e histórico de conversa
    response = model.generate_content(chat_history)

    # Adicionar resposta ao histórico de conversa
    chat_history.append(response.text)

    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
