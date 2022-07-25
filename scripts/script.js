//set events
const body = document.getElementsByTagName('body')[0];
body.setAttribute('onload', 'setEvents()');

//global variables decralation
const button = document.querySelectorAll('button');
const line = document.getElementsByClassName('line');
let winnerChecker = new Array(3); // array for checking winner
let i, j;

//function for setting events
const setEvents = () => {
    for(i=0; i<button.length; i++) {
        button[i].setAttribute('onclick', 'markSelected_user(this)');
    }
}

//function for marking user selected square
const markSelected_user = (element) => {
    element.setAttribute('class', 'selected-user');
    setTimeout(markSelected_device, 800);
}

//function for marking device selected square
const markSelected_device = () => {
    button[5].setAttribute('class', 'selected-device');
    setTimeout(checkWinnerHorizontally, 100)
}

//function for checking winner horizontally

const checkWinnerHorizontally = () => {
    
    for(i=0; i<line.length; i++) {

        let square_line = line[i].childNodes;
        for(j=0; j<square_line.length; i++) {
            console.log(square_line[j]);
        }
    }
}
