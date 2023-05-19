

//startar spelet med att ange kortens värde till 0 för både dealer och spelare
var DealerValue = 0;
var YourValue = 0;
var dealerAcesInHand = 0;
var yourAcesInHand = 0;


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
    let ranks = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    deck = [];


    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            deck.push(ranks[j] + "-" + suits[i]);
        }
    }

}



function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
    }
  }

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    // Nan är not-a-value och kollar om value inte är 2,3,4... upp till 10 så är det inte ett nummer och då ges a, k, q ett värde av 10 eller 11
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
        return 1;
    }
    return 0;
}

// Kollar om spelarens poäng är över 21 och om den har några ess i handen. Om den har ess i handen och över 21 ska spelarens poäng minska med 10
function reduceAce(YourValue, yourAcesInHand) {
    if (YourValue > 21 && yourAcesInHand > 0) { 
        YourValue - 10;
        yourAcesInHand -1;
    }
        else if (YourValue > 21 && yourAcesInHand === 0 ) {
            return YourValue; 
        }
        
        
    }

function startGame() {
    hidden = deck.pop();
    dealerAcesInHand += checkAce(hidden);

    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        DealerValue += getValue(card);
        dealerAcesInHand += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
        document.getElementById("dealer-sum").innerText = DealerValue;
    }


    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        YourValue += getValue(card);
        yourAcesInHand += checkAce(card);
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
    yourAcesInHand += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
    


    if (reduceAce(YourValue, yourAcesInHand) > 21) {
        canHit = false;

    }
    document.getElementById("your-sum").innerText = YourValue;


}


function stand() {
    DealerValue = reduceAce(DealerValue, dealerAcesInHand);
    YourValue = reduceAce(YourValue, yourAcesInHand);

    while (DealerValue < 17) {

        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        DealerValue += getValue(card);
        dealerAcesInHand += checkAce(card);
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


