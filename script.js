const buttons = [
    document.querySelector(".button-1"),
    document.querySelector(".button-2"),
    document.querySelector(".button-3"),
    document.querySelector(".button-4"),
    document.querySelector(".button-5")
];

const quizModal = document.getElementById("quizModal");

const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");

const answerButtons = document.querySelectorAll(".answer-btn");

const resultModal = document.getElementById("resultModal");
const resultTitle = document.getElementById("resultTitle");
const resultScore = document.getElementById("resultScore");
const resultButtons = document.getElementById("resultButtons");

const levelMessage = document.getElementById("levelMessage");

const marsImage =
    document.querySelector(".image-frame img");

let time = 20;
let timer;

let score = 0;
let currentQuestion = 0;

let currentLevel = 0;


/* Блокування рівнів */


for (let i = 1; i < buttons.length; i++) {

    buttons[i].style.opacity = "0.7";
}


/* Повідомлення */


function showMessage(text) {

    levelMessage.textContent = text;

    levelMessage.classList.remove("hide");

    void levelMessage.offsetWidth;

    levelMessage.classList.add("show");

    setTimeout(() => {

        levelMessage.classList.remove("show");

        levelMessage.classList.add("hide");

    }, 3200);
}


/* Запитання */


const quizzes = [

    /* Рівень 1 */

    [
        {
            question: "Яка планета відома як Червона планета?",
            answers: ["Венера", "Марс", "Юпітер", "Сатурн"],
            correct: 1
        },

        {
            question: "Скільки супутників має Марс?",
            answers: ["2", "5", "1", "8"],
            correct: 0
        },

        {
            question: "Найбільший вулкан на Марсі?",
            answers: ["Еверест", "Олімп Монс", "Геліос", "Вікторія"],
            correct: 1
        },

        {
            question: "Перший апарат на Марсі?",
            answers: ["Apollo 11", "Voyager 1", "Viking 1", "Curiosity"],
            correct: 2
        },

        {
            question: "Колір заходу сонця на Марсі?",
            answers: ["Синій", "Червоний", "Жовтий", "Зелений"],
            correct: 0
        }
    ],

    /* Рівень 2 */

    [
        {
            question: "Яка температура на Марсі взимку?",
            answers: ["-125°C", "20°C", "60°C", "-5°C"],
            correct: 0
        },

        {
            question: "Який робот зараз досліджує Марс?",
            answers: ["Perseverance", "Apollo", "Cassini", "Hubble"],
            correct: 0
        },

        {
            question: "З чого складається атмосфера Марса?",
            answers: ["Кисень", "Азот", "CO₂", "Гелій"],
            correct: 2
        },

        {
            question: "Скільки триває день на Марсі?",
            answers: ["10 годин", "24 години", "24.6 години", "40 годин"],
            correct: 2
        },

        {
            question: "Який колір має ґрунт Марса?",
            answers: ["Синій", "Червоний", "Зелений", "Білий"],
            correct: 1
        }
    ],

    /* Рівень 3 */

    [
        {
            question: "Яка сила тяжіння на Марсі?",
            answers: ["Як на Землі", "Менша", "Більша", "Немає"],
            correct: 1
        },

        {
            question: "Чи є вода на Марсі?",
            answers: ["Ні", "Лише лід", "Тільки океани", "Тільки дощ"],
            correct: 1
        },

        {
            question: "Який марсохід був найпершим?",
            answers: ["Sojourner", "Curiosity", "Spirit", "Opportunity"],
            correct: 0
        },

        {
            question: "Марс ближче до Сонця ніж Земля?",
            answers: ["Так", "Ні", "Іноді", "Невідомо"],
            correct: 1
        },

        {
            question: "На Марсі бувають бурі?",
            answers: ["Ні", "Так", "Лише взимку", "Раз на 100 років"],
            correct: 1
        }
    ],

    /* Рівень 4 */

    [
        {
            question: "Скільки триває рік на Марсі?",
            answers: ["365 днів", "687 днів", "200 днів", "900 днів"],
            correct: 1
        },

        {
            question: "Марс — це?",
            answers: ["Газовий гігант", "Карликова планета", "Кам’яниста планета", "Супутник"],
            correct: 2
        },

        {
            question: "Яка планета найближча до Марса?",
            answers: ["Венера", "Юпітер", "Земля", "Меркурій"],
            correct: 2
        },

        {
            question: "Що таке Olympus Mons?",
            answers: ["Море", "Вулкан", "Кратер", "Робот"],
            correct: 1
        },

        {
            question: "Марс має магнітне поле?",
            answers: ["Сильне", "Слабке", "Немає", "Таке як Земля"],
            correct: 1
        }
    ],

    /* Рівень 5 */

    [
        {
            question: "Хто планує колонізацію Марса?",
            answers: ["NASA і SpaceX", "Nintendo", "BMW", "Netflix"],
            correct: 0
        },

        {
            question: "Який корабель SpaceX для Марса?",
            answers: ["Dragon", "Starship", "Falcon", "Voyager"],
            correct: 1
        },

        {
            question: "Чи можна дихати на Марсі без скафандра?",
            answers: ["Так", "Ні", "Іноді", "Лише вночі"],
            correct: 1
        },

        {
            question: "Яка головна проблема Марса?",
            answers: ["Лава", "Кисень", "Метеори", "Ліси"],
            correct: 1
        },

        {
            question: "Чи можуть люди жити на Марсі в майбутньому?",
            answers: ["Так", "Ні", "Ніколи", "Тільки роботи"],
            correct: 0
        }
    ]
];


/* Тексти рівнів */


const levelTexts = [

    "На базі з'явилися повноцінні ферми та теплиці, де тепер можна вирощувати власну їжу.",

    "Ви перетворили сільськогосподарський комплекс на спеціалізований науково-дослідний центр.",

    "Значно збільшилася площа житлових та робочих приміщень, що дозволяє розмістити набагато більше колоністів.",

    "Замість наземних труб ви перейшли на підземні або внутрішні системи життєзабезпечення, звільнивши простір для життя.",

    "Тепер ви остаточно колонізували Марс, побудувавши автономне місто-сад під величним куполом."
];


/* Кнопки */


buttons.forEach((button, index) => {

    button.addEventListener("click", () => {

        if (
            index > 0 &&
            buttons[index].style.opacity === "0.7"
        ) {

            showMessage(
                "Пройдіть попередній рівень"
            );

            return;
        }

        startQuiz(index);
    });

});


/* Старт теста */


function startQuiz(level) {

    currentLevel = level;

    currentQuestion = 0;

    score = 0;

    scoreElement.textContent = score;

    quizModal.classList.add("active");

    loadQuestion();
}


/* Завантаження запитання */


function loadQuestion() {

    resetButtons();

    const q =
        quizzes[currentLevel][currentQuestion];

    questionElement.textContent = q.question;

    answerButtons.forEach((button, index) => {

        button.textContent = q.answers[index];

        button.onclick = () => {

            clearInterval(timer);

            if (index === q.correct) {

                button.classList.add("correct");

                score++;

                scoreElement.textContent = score;
            }

            else {

                button.classList.add("wrong");
            }

            if (
                currentQuestion >=
                quizzes[currentLevel].length - 1
            ) {

                setTimeout(() => {

                    finishQuiz();

                }, 300);
            }

            else {

                setTimeout(() => {

                    currentQuestion++;

                    loadQuestion();

                }, 1200);
            }

        };

    });

    startTimer();
}


/* Таймер */


function startTimer() {

    clearInterval(timer);

    time = 20;

    timerElement.textContent = time;

    timer = setInterval(() => {

        time--;

        timerElement.textContent = time;

        if (time <= 0) {

            clearInterval(timer);

            if (
                currentQuestion >=
                quizzes[currentLevel].length - 1
            ) {

                setTimeout(() => {

                    finishQuiz();

                }, 300);
            }

            else {

                setTimeout(() => {

                    currentQuestion++;

                    loadQuestion();

                }, 1200);
            }
        }

    }, 1000);
}


/* Очищення */


function resetButtons() {

    answerButtons.forEach(button => {

        button.classList.remove("correct");
        button.classList.remove("wrong");

    });
}


/* Фінал */


function finishQuiz() {

    clearInterval(timer);

    quizModal.classList.remove("active");

    resultModal.classList.add("active");

    resultScore.textContent =
        "Ваш результат: " + score + "/5";

    resultButtons.innerHTML = "";

    if (score >= 3) {

        resultTitle.textContent =
            levelTexts[currentLevel];

        const continueBtn =
            document.createElement("button");

        continueBtn.className = "result-btn";

        continueBtn.textContent = "Продовжити";

        continueBtn.onclick = () => {

            resultModal.classList.remove("active");

            /* Наступний рівень */

            const nextLevel = currentLevel + 1;

            if (buttons[nextLevel]) {

                buttons[nextLevel].style.opacity = "1";
            }

            /* Зміна зображення */

            marsImage.src =
                (currentLevel + 2) + ".png";
        };

        const retryBtn =
            document.createElement("button");

        retryBtn.className = "result-btn";

        retryBtn.textContent =
            "Пройти ще раз";

        retryBtn.onclick = () => {

            restartQuiz();
        };

        resultButtons.appendChild(continueBtn);

        resultButtons.appendChild(retryBtn);
    }

    else {

        resultTitle.textContent =
            "Рівень не пройдено";

        resultTitle.classList.add("fail");

        const retryBtn =
            document.createElement("button");

        retryBtn.className = "result-btn";

        retryBtn.textContent =
            "Спробувати ще раз";

        retryBtn.onclick = () => {

            restartQuiz();
        };

        resultButtons.appendChild(retryBtn);
    }
}


/* Рестарт */


function restartQuiz() {

    resultModal.classList.remove("active");

    currentQuestion = 0;

    score = 0;

    scoreElement.textContent = score;

    quizModal.classList.add("active");

    loadQuestion();
}