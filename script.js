const ws = new WebSocket("wss://chat-backend-xpl9.onrender.com");

ws.onopen = () => console.log("Connected to server");

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const chatBox = document.getElementById("chat-box");

    if (data.type === "history") {
        chatBox.innerHTML = "";
        data.messages.forEach(msg => {
            const messageElement = document.createElement("p");
            messageElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.message}`;
            chatBox.appendChild(messageElement);
        });
    } else if (data.type === "chat") {
        const messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
        chatBox.appendChild(messageElement);
    }
};

function sendMessage() {
    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;

    if (username && message) {
        ws.send(JSON.stringify({ type: "chat", username, message }));
        document.getElementById("message").value = "";
    }
}
