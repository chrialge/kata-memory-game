console.log('ciao')

let memoactive = null;
let errors = 0

let cards = [
    {
        'memo_index': 1,
        'show': false,
        'img': './assets/images/alien.png'
    },
    {
        'memo_index': 1,
        'show': false,
        'img': './assets/images/alien.png'
    },
    {
        'memo_index': 2,
        'show': false,
        'img': './assets/images/bug.png'
    },
    {
        'memo_index': 2,
        'show': false,
        'img': './assets/images/bug.png'
    },
    {
        'memo_index': 3,
        'show': false,
        'img': './assets/images/duck.png'
    },
    {
        'memo_index': 3,
        'show': false,
        'img': './assets/images/duck.png'
    },
    {
        'memo_index': 4,
        'show': false,
        'img': './assets/images/rocket.png'
    },
    {
        'memo_index': 4,
        'show': false,
        'img': './assets/images/rocket.png'
    },
    {
        'memo_index': 5,
        'show': false,
        'img': './assets/images/spaceship.png'
    },
    {
        'memo_index': 5,
        'show': false,
        'img': './assets/images/spaceship.png'
    },
    {
        'memo_index': 6,
        'show': false,
        'img': './assets/images/tiktac.png'
    },
    {
        'memo_index': 6,
        'show': false,
        'img': './assets/images/tiktac.png'
    },

];


function mescola(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);

        currentIndex -= 1;

        temporaryValue = array[currentIndex];

        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


mescola(cards);
console.log(cards)

// console.log(cards[0].img);

const rowEl = document.querySelector('.row')
for (let i = 0; i < 12; i++) {

    const markup = `
        <div class="card" id="card_${i}" onclick="show(${i})">
        <img src="./assets/images/back.png" alt="">
    </div>
    `
    rowEl.insertAdjacentHTML('beforeend', markup);

}
const cardEl = document.querySelectorAll('.card');
const errorsEl = document.getElementById('number_errors');
const appEl = document.getElementById('app_memory');
console.log(errorsEl);
function show(index) {
    if (cards[index].show === false) {

        if (memoactive === null) {
            cards[index].show = true;
            frame(index);
            const markup = `<img src="${cards[index].img}" alt="">`;

            cardEl[index].innerHTML = markup;

            return memoactive = index;
        } else if (errors === 6) {
            generateModalLoser();
        } else if (cards[memoactive].memo_index === cards[index].memo_index) {
            cards[index].show = true;
            const markup = `<img src="${cards[index].img}" alt="">`;
            cardEl[index].innerHTML = markup;
            return memoactive = null;
        } else {
            errors++;
            console.log(errors);
            errorsEl.innerHTML = `Errori: ${errors}`;
            const markupDefault = `<img src="${cards[index].img}" alt="">`;
            cardEl[index].innerHTML = markupDefault;
            setTimeout(() => {
                const markup = `<img src="./assets/images/back.png" alt="">`;
                cards[memoactive].show = false;
                cards[index].show = false;

                cardEl[memoactive].innerHTML = markup;
                cardEl[index].innerHTML = markup;
                return memoactive = null;
            }, 1000);

        }
    }


}


function restart() {
    location.reload()
}

function frame(index) {
    console.log('bjhdschds')
    cardEl[index].style.transition = "all 5s";
}
console.log(errors)

function generateModalWinner() {
    const markup = `
            <div class="overlay">
            <div class="card_winner">
                <h2>
                    Tu hai vinto
                </h2>
                <p>
                    Grande Hai completato il memory, hai visto con un po di impegno puoi arrivare fino alla fine. Se
                    vuoi giocare clicca
                </p>
                <div class="restart" onclick="restart()">
                    <h3 class='start-btn'>RESTART</h3>
                </div>
            </div>
        </div>`
    appEl.insertAdjacentHTML('beforeend', markup);
}

function generateModalLoser() {
    const markup = `
            <div class="overlay">
            <div class="card_lose">
                <h2>
                    Tu hai perso
                </h2>
                <p>
                    Devi impegnarti di piu per superare sto livello, quindi riprova e concentrati puoi farcela
                </p>
                <div class="restart" onclick="restart()">
                    <h3 class='start-btn'>RESTART</h3>
                </div>
            </div>
        </div>`
    appEl.insertAdjacentHTML('beforeend', markup);
}