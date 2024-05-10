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
        displayMessage("Med", data.response);
    })
    .catch(error => {
        console.error("Erro ao enviar mensagem:", error);
    });
}

function displayMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.innerHTML = `
        <strong style="color: #5F9EA0;">${sender}:</strong> ${marked(message)}
    `;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Rolar para baixo automaticamente
}

// Capturar eventos de teclado no textarea
document.getElementById("user-input").addEventListener("keydown", function(event) {
    // Verificar se a tecla pressionada é Enter e Shift está pressionado
    if (event.key === "Enter" && event.shiftKey) {
        // Adicionar uma quebra de linha
        this.value += "\n";
        // Impedir o envio do formulário
        event.preventDefault();
    }
});
