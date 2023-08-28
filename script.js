const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

const memoryBoard = document.querySelector('.memory-board');
let flipped = [];
let matches = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.className = 'card';
    card.addEventListener('click', () => flipCard(card, cardValue));
    return card;
}

function flipCard(card, cardValue) {
    if (flipped.length < 2 && !flipped.includes(card)) {
        card.textContent = cardValue;
        flipped.push(card);
    }

    if (flipped.length === 2) {
        if (flipped[0].textContent === flipped[1].textContent) {
            flipped.forEach(card => {
                card.removeEventListener('click', () => flipCard(card, cardValue));
                card.style.backgroundColor = '#66bb6a';
            });
            matches++;
            if (matches === cards.length / 2) {
                setTimeout(() => {
                    alert('Herzlichen Glückwunsch, du hast gewonnen!');
                }, 500);
            }
            flipped = [];
        } else {
            setTimeout(() => {
                flipped.forEach(card => {
                    card.textContent = '';
                    flipped = [];
                });
            }, 1000);
        }
        
    }
}

function init() {
    shuffle(cards);
    cards.forEach(cardValue => {
        const card = createCard(cardValue);
        memoryBoard.appendChild(card);
    });
}

init();
