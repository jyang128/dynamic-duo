$(document).ready( initializeApp );

function initializeApp() {
    display_stats();
    createCards(fullImages);
    appendCardsToDom();
    $('.back').on('click', card_clicked);
}

var images = [
    'images/transmogrifier.png',
    'images/faces.png',
    'images/laughter.png',
    'images/scared.png',
    'images/smallhobbes.png',
    'images/snow.png',
    'images/snowgoons.png',
    'images/stuffedhobbes.png',
    'images/timemachine.png',
];
var fullImages = images.concat(images);

var first_card_clicked = null;
var second_card_clicked = null;
var first_card_back;
var second_card_back;
var total_possible_matches = 9;
var match_counter = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

//reset button invokes reset_stats function
$('.reset-button').on('click', function(){
    games_played++;
    $('.card-container').remove();
    createCards(fullImages);
    appendCardsToDom();
    $('.back').on('click', card_clicked);
    reset_stats();
    $('.back').show();
});

function reset_stats(){
    attempts = 0;
    accuracy = 0;
    match_counter = 0;
    display_stats();
}

function display_stats(){
    $('.games-played .value').text( games_played );
    $('.attempts .value').text( attempts );
    $('.accuracy .value').text( accuracy.toFixed(2) + '%' );
}

// takes the fullImages array and randomizes the cards
function createCards(fullImages) {
    for (var cardIndex = fullImages.length - 1; cardIndex >= 0; cardIndex--) {
        var randomNum = Math.floor(Math.random() * fullImages.length);
        var itemToSwap = fullImages[randomNum];
        fullImages[randomNum] = fullImages[cardIndex];
        fullImages[cardIndex] = itemToSwap;
    }
}

//happens on on game reload - creates the cards in the DOM using the random array
function appendCardsToDom(){
    for (var divIndex = 0; divIndex < fullImages.length; divIndex++) {
        var newCardContainer = $('<div>').addClass('card-container');
        var newCard = $('<div>').addClass('card');
        var frontCard = $('<div>').addClass('front');
        var imageFile = $('<img>').attr('src', fullImages[divIndex]);
        var backCard = $('<div>').addClass('back');
        frontCard.append(imageFile);
        newCard.append(frontCard);
        newCard.append(backCard);
        newCardContainer.append(newCard);
        $('.game-area').append(newCardContainer);
    }
}

function card_clicked() {
    $(this).hide();
    if (first_card_clicked === null) {
        first_card_clicked = $(this).prev().find('img').attr('src');
        console.log(first_card_clicked);
        first_card_back = $(this);
    } else {
        second_card_clicked = $(this).prev().find('img').attr('src');
        console.log(second_card_clicked);
        second_card_back = $(this);
        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            console.log(match_counter);
            display_stats();
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                console.log('You win!');
            }
        } else {
            //prevent any further clicks until flip_card runs
            $('.back').off('click', card_clicked);
            setTimeout(function(){
                flip_card();
                }, 1000);
            first_card_clicked = null;
            second_card_clicked = null;
        }
        attempts++;
        accuracy = (match_counter / attempts) * 100;
        display_stats();
    }
}
function flip_card() {
    first_card_back.show();
    second_card_back.show();
    $('.back').on('click', card_clicked);
}