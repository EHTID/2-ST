// Функция для генерации случайной картинки
function generateRandomImage() {
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        // Добавьте здесь другие изображения
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    document.getElementById('clickerImage').src = randomImage;
}

// Вызов функции для генерации случайной картинки при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    generateRandomImage();
});

// Обновление таблицы лидеров
function updateLeaderboard() {
    // Код обновления таблицы лидеров
}

// Функция для обновления счета
function updateScore(score) {
    document.getElementById('score').textContent = `Очки: ${score}`;
}

// Добавление очков при клике
document.getElementById('clickerContainer').addEventListener('click', () => {
    // Увеличиваем счет
    score++;
    updateScore(score);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Получаем данные таблицы лидеров из сервера (предполагается AJAX-запрос)
    // Здесь можно использовать fetch или другие методы для получения данных

    // После получения данных обновляем таблицу лидеров
    updateLeaderboard();
});
