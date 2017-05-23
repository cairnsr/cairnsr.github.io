/*
 * Add your JavaScript to this file to complete the assignment.
 */

var modalBackdrop = document.getElementById('modal-backdrop');
var createTwit = document.getElementById('create-twit-modal');

var addButton = document.getElementById('create-twit-button');

var cancelButton = document.querySelector('.modal-cancel-button');
var closeButton = document.querySelector('.modal-close-button');
var createButton = document.querySelector('.modal-accept-button');
var twitContainer = document.querySelector('.twit-container');


function makingTweet() {

  modalBackdrop.style.display = 'block';
  createTwit.style.display = 'block';
}

addButton.addEventListener('click', makingTweet);

function closingTweet (){

  textInput.value = '';
  authorInput.value = '';

  modalBackdrop.style.display = 'none';
  createTwit.style.display = 'none';

}

closeButton.addEventListener('click', closingTweet);
cancelButton.addEventListener('click', closingTweet);


function continueMakeTweet(event){

  var newTwit = document.createElement('article');
  var newDiv = document.createElement('div');
  var newI = document.createElement('i');
  var newTwitDiv = document.createElement('div');
  var newTwitText = document.createElement('p');
  var newTwitAuthor = document.createElement('p');


  newTwit.classList.add('twit');
  newDiv.classList.add('twit-icon');
  newI.classList.add('fa', 'fa-bullhorn');
  newTwit.appendChild(newDiv);
  newDiv.appendChild(newI);

  newTwitDiv.classList.add('twit-content');
  newTwitAuthor.classList.add('twit-attribution');
  newTwitText.classList.add('twit-text');
  newTwitText.textContent = textInput.value;
  newTwitAuthor.textContent = authorInput.value;

  newTwitDiv.appendChild(newTwitText);
  newTwitDiv.appendChild(newTwitAuthor);
  newTwit.appendChild(newTwitDiv);
  twitContainer.appendChild(newTwit);
}

function makeTweet (){


  if ((textInput.value == '') || (authorInput.value == '')){

    alert("You did not input text in both boxes");

  }
  else {
    continueMakeTweet();
    modalBackdrop.style.display = 'none';
    createTwit.style.display = 'none';
    textInput.value = '';
    authorInput.value = '';
  }
}

createButton.addEventListener('click', makeTweet);

var elem = document.body.firstChild;
var twit = document.getElementsByClassName('twit');
var content = document.querySelector('div.twit-content');
var icon = document.querySelectorAll('.twit-icon');
var textInput = document.getElementById('twit-text-input');
var authorInput = document.getElementById('twit-attribution-input');
var searchInput = document.getElementById('navbar-search-input');
var searchButton = document.getElementById('navbar-search-button');
var allTweets = document.querySelectorAll('.twit');

function searchWords() {

  for (var i = 0; i < allTweets.length; i++) {
    var allWords = allTweets[i].getElementsByTagName('p');

    if (allWords.twitText == searchInput.value){

     allTweets[i].remove(allTweets.twit);
    }
    console.log (searchInput.value);
 }
}

searchButton.addEventListener('click', searchWords);
