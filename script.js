document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    let dictionary = {}; 

    fetch('dictionary.json')
        .then(response => response.json()) 
        .then(data => {
            dictionary = data; 
            console.log('Từ điển đã được tải thành công!');
        })
        .catch(error => console.error('Lỗi khi tải từ điển:', error));

    function handleUserMessage() {
        const query = userInput.value.trim().toLowerCase(); 

        if (query === '') return; 

        appendMessage(query, 'user');
        userInput.value = '';

        let response;
        if (dictionary[query]) {
            response = dictionary[query];
        } else {
            response = "Rất tiếc, tôi không tìm thấy định nghĩa cho thuật ngữ này. Vui lòng thử lại với từ khác.";
        }

        setTimeout(() => {
            appendMessage(response, 'bot');
        }, 500);
    }

    function appendMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener('click', handleUserMessage);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleUserMessage();
        }
    });
});