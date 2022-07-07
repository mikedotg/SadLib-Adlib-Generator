const storyRequest = 'http://madlibz.herokuapp.com/api/random';

var submitBtn = $('<button>Make Me a Story!</button>');
var inputForm = $('<form>'); // makes a new form element

var startBtn = $('#start');

var storyLength = 10;
var storyData;

startBtn.on('click', function() { //start button event listener
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
    }

    //appends a submit button to the buttom of the form
    inputForm.append(submitBtn);
}

function assembleStory(event) {
    event.preventDefault(); //stops the form from resetting
    $('body').empty(); // clears the page

    var storyEl = $('<p>'); // makes a new <p> element
    
    //loops through the data object's arrays to concatenate the story
    //into a single paragraph and assigns that to the <p> element
    storyEl.text(storyData.value[0]);
    for (var i = 1; i < storyData.value.length-1; i++) {
        var input = inputForm.children().eq(i).children('input').val();
        var nextLine = storyData.value[i];
        storyEl.text(storyEl.text()+input+nextLine);
    }
    //appends the <p> element to the page
    $('body').append(storyEl);
}