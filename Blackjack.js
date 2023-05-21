

//startar spelet med att ange kortens värde till 0 för både dealer och spelare
var DealerValue = 0;
var YourValue = 0;
var dealerAceCount = 0;
var yourAceCount = 0;


var hidden;
var deck;


var canHit = true;

//skapar och startar spelet efter allt har laddat in
window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

//gör en loop i en annan loop för att ange en type för varje value som sedan skapas med hjälp av push
function buildDeck() {
    let values = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    let types = ["Clubs", "Diamonds", "Hearts", "Spades"];
    deck = [];


    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }

}

//returnerar deck i en slumpmäsigt blandad ording med hjälp av inbyggda funktionerna Math.Random och Math.Floor 
//genom att ange en random value (i) till en random type (j)
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

}


function startGame() {
    hidden = deck.pop();
    dealerAceCount += checkAce(hidden);



    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        DealerValue += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
        document.getElementById("dealer-sum").innerText = DealerValue;
    }


    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        YourValue += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
        document.getElementById("your-sum").innerText = YourValue;
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("restart_game").addEventListener("click", restartgame);
}
function restartgame() {
    location.reload()

}
function hit() {
    if (!canHit) {
        return;
    }


    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    YourValue += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);


    if (reduceAce(YourValue, yourAceCount) > 21) {
        canHit = false;

    }
    document.getElementById("your-sum").innerText = YourValue;


}


function stand() {
    DealerValue = reduceAce(DealerValue, dealerAceCount);
    YourValue = reduceAce(YourValue, yourAceCount);

    while (DealerValue < 17) {

        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        DealerValue += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);

    }
    setTimeout(() => {
        document.getElementById("results").style.display = "flex";
    }
        , 500);

    canHit = false;

    let message = "";
    if (YourValue > 21) {
        message = "You Lose!";
        document.getElementById("results").style.background = "url(https://media3.giphy.com/media/MAcSVnA5JnU8J1I5yQ/200w.gif?cid=6c09b9528i6ciwzmto5b8rq2n3sqzujr8b3wltpsx0nyj7ks&rid=200w.gif&ct=s)";

    }
    else if (DealerValue > 21) {
        message = "You win!";
    }


    else if (YourValue == DealerValue) {
        message = "Tie!";
        document.getElementById("results").style.background = "url()";
    }
    else if (YourValue > DealerValue) {
        message = "You Win!";
    }
    else if (YourValue < DealerValue) {
        message = "You Lose!";
        document.getElementById("results").style.background = "url(https://media3.giphy.com/media/MAcSVnA5JnU8J1I5yQ/200w.gif?cid=6c09b9528i6ciwzmto5b8rq2n3sqzujr8b3wltpsx0nyj7ks&rid=200w.gif&ct=s)";
    }




    document.getElementById("dealer-sum").innerText = DealerValue;
    document.getElementById("your-sum").innerText = YourValue;
    document.getElementById("results").innerText = message;
}


function getValue(card) {
    let data = card.split("-");
    let value = data[0];


    if (isNaN(value)) {
        if (value === "a") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}


function checkAce(card) {
    if (card[0] == "a") {
        return 11;
    }
    return 0;
}


function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
