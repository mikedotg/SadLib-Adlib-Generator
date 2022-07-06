const storyRequest = 'http://madlibz.herokuapp.com/api/random';

var startBtn = $('#start');

var tempLength = 10;

startBtn.on('click', function() { //start button event listener
    //fills in required content for requestUrl
    var requestUrl = storyRequest+'?minlength='+tempLength+'&maxlength='+tempLength; 
    getStory(requestUrl); // sends a request to the madLibz api to grab a random story
});

//function that handles the madLibz api request
function getStory(requestUrl) {
    fetch(requestUrl).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
    });
}