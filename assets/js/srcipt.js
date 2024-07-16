console.log('ciao')

// variabile che racoglie il indice della carta di memory
let memoactive = null;
// variabile che raccoglie gli errori
let errors = 0
// variabile il numero di combinazioni fatte
let combination = 0;

// array di ogggetti
let cards = [
    {
        'memo_index': 1,
        'show': false,
        'name': 'alieno',
        'img': './assets/images/alien.png'
    },
    {
        'memo_index': 1,
        'show': false,
        'name': 'alieno',
        'img': './assets/images/alien.png'
    },
    {
        'memo_index': 2,
        'show': false,
        'name': 'insetto',
        'img': './assets/images/bug.png'
    },
    {
        'memo_index': 2,
        'show': false,
        'name': 'insetto',
        'img': './assets/images/bug.png'
    },
    {
        'memo_index': 3,
        'show': false,
        'name': 'antra',
        'img': './assets/images/duck.png'
    },
    {
        'memo_index': 3,
        'show': false,
        'name': 'antra',
        'img': './assets/images/duck.png'
    },
    {
        'memo_index': 4,
        'show': false,
        'name': 'razzo',
        'img': './assets/images/rocket.png'
    },
    {
        'memo_index': 4,
        'show': false,
        'name': 'razzo',
        'img': './assets/images/rocket.png'
    },
    {
        'memo_index': 5,
        'show': false,
        'name': 'navicella',
        'img': './assets/images/spaceship.png'
    },
    {
        'memo_index': 5,
        'show': false,
        'name': 'navicella',
        'img': './assets/images/spaceship.png'
    },
    {
        'memo_index': 6,
        'show': false,
        'name': 'tris',
        'img': './assets/images/tiktac.png'
    },
    {
        'memo_index': 6,
        'show': false,
        'name': 'tris',
        'img': './assets/images/tiktac.png'
    },

];

// funzione che mescola l'array in modo casuale
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

// invoca la funzione che mescola l'array
mescola(cards);



// ciclo che inserisce le carte coperte
for (let i = 0; i < 12; i++) {
    //prende il nodo della dom
    const rowEl = document.querySelector('.row')

    // crea una variabile dove contiene ol markup
    const markup = `
        <div class="card" id="card_${i}" onclick="show(${i})" role="button" aria-label="card" tabindex="0" onkeypress="show(${i})">
        <img src="./assets/images/back.png" alt="carta coperta">
    </div>
    `
    //inserisce prima della fine della dom il markup per ogni cilo
    rowEl.insertAdjacentHTML('beforeend', markup);

}
// costante che raccoglie le card
const cardEl = document.querySelectorAll('.card');

// costante che raccohglie il nodo della dom degli errori
const errorsEl = document.getElementById('number_errors');

// costante che raccoglie il no della dom di tutta l'app
const appEl = document.getElementById('app_memory');

// funzione che mostra le carte
function show(index) {

    // se la card non e stata scoperta
    if (cards[index].show === false) {

        // se non ho ancora selezionata nessuna card
        if (memoactive === null) {

            // cambia il valore show della carta in true
            cards[index].show = true;
            frame(index);
            // costante contenente la carta scoperta
            const markup = `<img src="${cards[index].img}" alt="${cards[index].name}">`;
            // inserisce il markup e toglie il resto
            cardEl[index].innerHTML = markup;
            // salva il valore dell'index
            return memoactive = index;

        } else if (cards[memoactive].memo_index === cards[index].memo_index) {
            // altrimenti se combacciano le card

            // aumenta il numero delle combinazioni
            combination++

            // cambia il valore show della carta in true
            cards[index].show = true;

            // costante contenente la carta scoperta
            const markup = `<img src="${cards[index].img}" alt="${cards[index].name}">`;

            // inserisce il markup e toglie il resto
            cardEl[index].innerHTML = markup;

            // se le combinazioni arrivano a 6
            if (combination == 6) {
                // generi la modale che hai vinto
                generateModalWinner()
            }
            // resetta il valore salvato
            return memoactive = null;
        } else {
            // aumenta il numero di errrori
            errors++;

            // inserisce nel nodo il numero di errori
            errorsEl.innerHTML = `Errori: ${errors}`;

            // costante con il markup contenente la carta scoperta
            const markupDefault = `<img src="${cards[index].img}" alt="${cards[index].name}">`;

            // inserisce la carta scoperta
            cardEl[index].innerHTML = markupDefault;

            // se fai 6 errori
            if (errors == 6) {
                // generi la modale che hai perso
                generateModalLoser()
            } else {
                // dopo 0,4s 
                setTimeout(() => {
                    // costante contenete la carta coperta
                    const markup = `<img src="./assets/images/back.png" alt="carta coperta">`;

                    // diventa falsa lo show della carta selzionata precedentemente
                    cards[memoactive].show = false;
                    // diventa falsa lo show della carta selzionata adesso
                    cards[index].show = false;

                    // inserisce la carta coperta
                    cardEl[memoactive].innerHTML = markup;
                    // inserisce la carta coperta
                    cardEl[index].innerHTML = markup;
                    // resetta il valore salvato
                    return memoactive = null;
                }, 400);
            }


        }
    }


}


/**
 * funzione che ricarica la pagina
 */
function restart() {
    location.reload()
}

function frame(index) {
    console.log('bjhdschds')
    cardEl[index].style.transition = "all 5s";
}

/**
 * funzione che genera la modale di vittoria
 */

function generateModalWinner() {

    // costante contenete il markup della modale per quando vinci
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
                <div class="restart" onclick="restart()" role="button" tabindex="0" onkeypress="restart()">
                    <h3 class='start-btn' role="button">RESTART</h3>
                </div>
            </div>
        </div>`

    // inserisce la modale
    appEl.insertAdjacentHTML('beforeend', markup);
}
/**
 * funzione che genera la modale per aver perso
 */
function generateModalLoser() {

    // costante contenete il markup della modale per quando perdi
    const markup = `
            <div class="overlay">
            <div class="card_lose">
                <h2>
                    Tu hai perso
                </h2>
                <p>
                    Devi impegnarti di piu per superare sto livello, quindi riprova e concentrati puoi farcela
                </p>
                <div class="restart" onclick="restart()" role="button" tabindex="0" onkeypress="restart()">
                    <h3 class='start-btn' role="button">RESTART</h3>
                </div>
            </div>
        </div>`

    // inserisce la modale
    appEl.insertAdjacentHTML('beforeend', markup);
}