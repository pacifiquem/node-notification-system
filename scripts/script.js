//set events
const body = document.getElementsByTagName('body')[0];
body.setAttribute('onload', 'setEvents()');

//global variables decralation
const button = document.querySelectorAll('button');
const line = document.getElementsByClassName('line');
let i;


const setEvents = () => {
    for(i=0; i<button.length; i++) {
        button[i].setAttribute('onclick', 'markSelected_user(this)');
    }
}

const markSelected_user = (element) => {
    element.setAttribute('class', 'selected-user');
    setTimeout(markSelected_computer, 800);
}

const markSelected_computer = () => {
    button[5].setAttribute('class', 'selected-device');
    setTimeout(checkWinner, 100)
}

const checkWinner = () => {
    console.log('winner checked');
}