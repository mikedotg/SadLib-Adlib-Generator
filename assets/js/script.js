const storyRequest = 'http://madlibz.herokuapp.com/api/random';
const wordRequest = 'https://wordsapiv1.p.mashape.com/words/';

var submitBtn = $('<button>Make Me a Story!</button>');
var inputForm = $('<form>'); // makes a new form element


var startBtn = $('#start');

var storyLength;
var storyData;



startBtn.on('click', function() { //start button event listener
    //gives the variable the value inputted into the modal 
    storyLength = $('#lengthInput').val(); 
    console.log(storyLength);
    //fills in required content for requestUrl
    var requestUrl = storyRequest+'?minlength='+storyLength+'&maxlength='+storyLength; 
    getStory(requestUrl); // sends a request to the madLibz api to grab a random story
});

submitBtn.on('click', assembleStory);

//function that handles the madLibz api request
function getStory(requestUrl) {
    fetch(requestUrl).then(function(res) {
        return res.json();
    }).then(function(data) {
        storyData = data;
        console.log(data);

        renderInputs();
    });
}

function renderInputs() {
    $('body').empty();
    var bodyEl = $('#body'); // grabs the body element
    bodyEl.append(inputForm); // appends the form element to the page
    for (var i = 0; i < storyLength; i++) { // makes an input for the number of branches 
        var row = $('<div>'); // makes a creates a new div
        var blankInp = $('<input>'); // creates a new input element
        // sets the placeholder of the input to be the needed type of the input
        blankInp.attr('placeholder', storyData.blanks[i]); 
        var randomizeBtn = $('<button>Random</button>'); // creates a new button element with the text "Random"
        //appends the generated elements to the page
        inputForm.append(row);
        row.append(blankInp);
        row.append(randomizeBtn);
        randomizeBtn.on('click', function() {
            var formChildren;
            event.preventDefault();
            console.log("Random button is clicked");
            var randWordRequest = wordRequest + "?partOfSpeech=" + blankInp.attr('placeholder');
            console.log(randWordRequest);
            getRandWordsReq(randWordRequest);
        })
        // randomizeBtn.on('click', function() {
      
        // });

    }

    //appends a submit button to the buttom of the form
    inputForm.append(submitBtn);
}

function assembleStory(event) {
    event.preventDefault(); //stops the form from resetting
    $('body').empty(); // clears the page

}

// function that handles the WordsAPI api request
function getRandWordsReq(requestUrl) {
    fetch(requestUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        return 
    });
}

// Need to delegate event listener 

// function randomizeWord () {

//     // if placeholder requires this type of word
//     // grab the placeholder value and search a random word based on that
//     // grabbing verb
//     // https://wordsapiv1.p.mashape.com/words/?partOfSpeech=verb
// } 


    // var storyEl = $('<p>'); // makes a new <p> element
    
    // //loops through the data object's arrays to concatenate the story
    // //into a single paragraph and assigns that to the <p> element
    // storyEl.text(storyData.value[0]);
    // for (var i = 1; i < storyData.value.length-1; i++) {
    //     var input = inputForm.children().eq(i).children('input').val();
    //     var nextLine = storyData.value[i];
    //     storyEl.text(storyEl.text()+input+nextLine);
    // }
    // //appends the <p> element to the page
    // $('body').append(storyEl);
