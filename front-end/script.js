function sendMessage() {
    var userInput = document.getElementById("user-input").value;

    // Limpar campo de entrada
    document.getElementById("user-input").value = "";

    // Exibir mensagem do usuário no chat
    displayMessage("Você", userInput);

    // Enviar mensagem para o backend e receber resposta
    fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Exibir resposta do chatbot no chat
        displayMessage("Med Bot", data.response);
    })
    .catch(error => {
        console.error("Erro ao enviar mensagem:", error);
    });
}

function displayMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Rolar para baixo automaticamente
}
