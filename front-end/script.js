function sendMessage() {
    var userInput = document.getElementById("user-input").value;

    document.getElementById("user-input").value = "";

    displayMessage("Você", userInput);

    fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {

        displayMessage("Méd", data.response);
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
    chatBox.scrollTop = chatBox.scrollHeight; 
}

// Capturar eventos de teclado no textarea
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && event.shiftKey) {

        this.value += "\n";

        event.preventDefault();
    }
});
