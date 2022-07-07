const storyRequest = 'http://madlibz.herokuapp.com/api/random';
const randWordRequest = 'https://wordsapiv1.p.mashape.com/words/';

var submitBtn = $('<button>Make Me a Story!</button>');
var inputForm = $('<form>'); // makes a new form element


var startBtn = $('#start');

var storyLength = 10;



startBtn.on('click', function() { //start button event listener
    //fills in required content for requestUrl
    var requestUrl = storyRequest+'?minlength='+storyLength+'&maxlength='+storyLength; 
    getStory(requestUrl); // sends a request to the madLibz api to grab a random story
});

submitBtn.on('click',function() {
    assembleStory();
});

//function that handles the madLibz api request
function getStory(requestUrl) {
    fetch(requestUrl).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        renderInputs(data);
    });
}

function renderInputs(data) {
    $('body').empty();
    var bodyEl = $('#body'); // grabs the body element
    bodyEl.append(inputForm); // appends the form element to the page
    for (var i = 0; i < storyLength; i++) { // makes an input for the number of branches 
        var row = $('<div>'); // makes a creates a new div
        var blankInp = $('<input>'); // creates a new input element
        // sets the placeholder of the input to be the needed type of the input
        blankInp.attr('placeholder', data.blanks[i]); 
        var randomizeBtn = $('<button>Random</button>'); // creates a new button element with the text "Random"
        //appends the generated elements to the page
        inputForm.append(row);
        row.append(blankInp);
        row.append(randomizeBtn);
    }

    //appends a submit button to the buttom of the form
    inputForm.append(submitBtn);
}

function assembleStory(event) {
    event.preventDefault();
    $('body').empty();

}

// function that handles the WordsAPI api request
function getRandWordsReq(randWordRequest) {
    fetch(randWordRequest).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    });
}

// 
randomizeBtn.on('click', function) {
    randomizeWord(data);
}

function randomizeWord (data) {
    // if placeholder requires this type of word
    // grab the placeholder value and search a random word based on that
    // 
    if (blankInp == 'noun') {
        rando
    } else if (blankInp = 'verb') {

    } else if (blankInp = 'adjective') {

    } else if (blankInp = 'adverb') {

    }
} 


