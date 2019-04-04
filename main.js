$(document).ready( initializeApp );

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var first_card_back;
var second_card_back;

function initializeApp() {
    $('.back').on('click', card_clicked);
}

function card_clicked() {
    $(this).hide();
    if (first_card_clicked === null) {
        first_card_clicked = $(this).prev().find('img').attr('src');
        // console.log(first_card_clicked);
        first_card_back = $(this);
    } else {
        second_card_clicked = $(this).prev().find('img').attr('src');
        // console.log(second_card_clicked);
        second_card_back = $(this);
        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            console.log(match_counter);
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                console.log('You win!');
            }
        } else {
            //prevent any further clicks while flip_card runs
            $('.back').css("pointer-events", "none");
            setTimeout(function(){
                flip_card();
                }, 2000);
            first_card_clicked = null;
            second_card_clicked = null;
        }
    }
}

function flip_card() {
    first_card_back.show();
    second_card_back.show();
    $('.back').css("pointer-events", "auto");
}