$(document).ready( initializeApp );

function initializeApp() {
    $('.welcome-modal').show();
    display_stats();
    createCards(fullImages);
    appendCardsToDom();
    $('.game-area').on('click', '.back', card_clicked);
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

// start button hides the welcome modal and shows the game area
$('.start.button').on('click', function(){
    $('.game').css({
        'visibility': 'visible',
        'overflow': 'visible'
    });
    $('.welcome-modal').fadeOut(500);
})

//reset button sets up the game again and increments games played
$('.reset.button').on('click', function(){
        if(attempts === 0 && first_card_clicked === null) return;
        games_played++;
        first_card_clicked = null;
        second_card_clicked = null;
        $('.congrats-modal').fadeOut(500); // hide the overlay
        $('.card-container').remove();
        createCards(fullImages);
        appendCardsToDom();
        reset_stats();
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
        var randomNum = Math.floor(Math.random() * (cardIndex + 1));
        var imageToSwap = fullImages[randomNum];
        fullImages[randomNum] = fullImages[cardIndex];
        fullImages[cardIndex] = imageToSwap;
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
    $(this).addClass('hide')

    if (first_card_clicked === null) {
        first_card_clicked = $(this).prev().find('img').attr('src');
        first_card_back = $(this);
    } else {
        //prevent any further clicks until cards flip OR match is checked
        $('.game-area').off('click', '.back', card_clicked);

        second_card_clicked = $(this).prev().find('img').attr('src');
        second_card_back = $(this);
        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            attempts++;
            accuracy = (match_counter / attempts) * 100;
            display_stats();
            first_card_clicked = null;
            second_card_clicked = null;

            if (match_counter === total_possible_matches) {
                // SPECIAL CONGRATS
                setTimeout(show_win, 500);
            }

            $('.game-area').on('click', '.back', card_clicked);
        } else {
            setTimeout(flip_card, 900);
        }
    }
}

//callback functions to reference inside setTimeout functions
function show_win(){
    $('.congrats-modal').fadeIn(500);
}
function flip_card() {
    first_card_clicked = null;
    second_card_clicked = null;
    first_card_back.removeClass('hide');
    second_card_back.removeClass('hide');
    attempts++;
    accuracy = (match_counter / attempts) * 100;
    display_stats();
    $('.game-area').on('click', '.back', card_clicked);
}
