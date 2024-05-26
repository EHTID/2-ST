let score = 0;
let leaderboardData = [];

function generateRandomImage() {
    const images = [
        'image1.jpg',
        
        // Добавьте здесь другие изображения
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    document.getElementById('clickerImage').src = randomImage;
}

function updateLeaderboard() {
    // Код обновления таблицы лидеров
}

function updateScore(score) {
    document.getElementById('score').textContent = `Очки: ${score}`;
}

document.getElementById('clickerContainer').addEventListener('click', () => {
    score++;
    updateScore(score);
});

document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Создаем объект для отправки на сервер
    const data = {
        username: username,
        password: password
    };

    // Отправляем POST запрос на сервер
    fetch('https://ehtid.github.io/2-ST/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Обработка успешного ответа от сервера
        console.log('Регистрация прошла успешно', data);
        // После успешной регистрации, можно обновить таблицу лидеров и сбросить счет
        updateLeaderboard();
        score = 0;
        updateScore(score);
    })
    .catch(error => {
        // Обработка ошибки
        console.error('There has been a problem with your fetch operation:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    generateRandomImage();
    updateLeaderboard();
});
