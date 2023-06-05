// CREATE GUITAR LISTS
let allLetters = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let openChords = ['E', 'A', 'D', 'G', 'B', 'E'];

let fullChord = {
    aRoot: ''
};
let letterXtra = {};
let triadObj = {};
let triad;
let isSF = false; //
let isMinor = false;
let isSuspended = false; //
let addedNum = false;
let addedNum2 = false; 
let addedNum3 = false;
let difBass = false;

let fullName = '';


function MakeCh() {
    let chord = document.querySelector("#mainChord").value;
    let shFl = document.querySelector("#changes").value;
    let minor = document.querySelector("#minor").checked;
    let susCh = document.querySelector("#suspended").value;
    let addValue = document.querySelector("#number").value;
    let addValue2 = document.querySelector("#number2").value;
    let addValue3 = document.querySelector("#number3").value;
    let bassDif = document.querySelector("#bassNote").value;
    
    //Set bass == false
    difBass = false;

    x = chord;
    fullChord.aRoot = chord;
    let rootToBass = fullChord.aRoot;
    //sharp or flat
    if (shFl != 'none') {
        fullChord.bShFl = shFl;
        x += shFl;
        isSF = true;
        // check if ROOT = BASS
        if (shFl == '#') {rootToBass = fullChord.aRoot+fullChord.bShFl;}
        else if (shFl == 'b') {
            if (fullChord.aRoot == 'C') {rootToBass = 'B';}
            else {
                let oneB4 = allLetters.indexOf(chord)-1; 
                rootToBass = allLetters[oneB4];
            }
        }
    } else {isSF = false; fullChord.bShFl = '';} 
    
    
    //minor
    if (minor) {
        fullChord.cMinor = 'm';
        x += 'm';
        isMinor = true;
    } else {isMinor = false; fullChord.cMinor = ''}
    //susp
    if (susCh != 'none' && !minor) {
        fullChord.cSus = susCh;
        x += 'sus'+susCh;
        isSuspended = true;
    // if SUS and MINOR together
    } else if (susCh != 'none' && minor) {
        alert("Can't have suspended and minor altogether!")
        fullChord.cMinor = '';
        fullChord.cSus = '';
        document.querySelector("#minor").checked = false;
        document.querySelector("#suspended").value = 'none';
        isMinor = false;
        isSuspended = false;
    } else {isSuspended = false; fullChord.cSus = ''}


    //add1
    if ((addValue != addValue2 && addValue != addValue3) && typeof(addValue) != 'undefined' && addValue != susCh && addValue != 'none') {
        fullChord.dAddValue1 = addValue;
        x += '('+addValue+')';
        addedNum = true;
    } else {fullChord.dAddValue1 = ''; addedNum = false}
    //add2
    if ((addValue2 != addValue && addValue2 != addValue3) && typeof(addValue2) != 'undefined' && addValue2 != susCh && addValue2 != 'none') {
        fullChord.dAddValue2 = addValue2;
        x += '('+addValue2+')';
        addedNum2 = true;
    } else {fullChord.dAddValue2 = ''; addedNum2 = false}
    //add3
    if ((addValue3 != addValue && addValue2 != addValue3) && typeof(addValue3) != 'undefined' && addValue3 != susCh && addValue3 != 'none') {
        fullChord.dAddValue3 = addValue3;
        x += '('+addValue3+')';
        addedNum3 = true;
    } else {fullChord.dAddValue3 = ''; addedNum3 = false}

    //bass// Add BASS NOTE
    if (bassDif != rootToBass && bassDif != 'same') {
        fullChord.eBass = bassDif;
        x += "/"+bassDif;
        difBass = true;
    } else if (bassDif === rootToBass) {
        difBass = false;
        fullChord.eBass = '';
        alert('BASS is SAME as ROOT!');
        document.querySelector('#bassNote').value = 'same';
    } else if (bassDif == 'same') {
        difBass = false;
        fullChord.eBass = '';
    }
        
    fullName = x;
    document.querySelector('#finCh').innerHTML = x;
    
}

function formChord() {
    let chord = fullChord.aRoot;
    let shFl = fullChord.bShFl;

    let susCh = fullChord.cSus;

    let addValue = fullChord.dAddValue1;
    let addValue2 = fullChord.dAddValue2;
    let addValue3 = fullChord.dAddValue3;

    let bassDif = fullChord.eBass;

    triadObj = {};

    // create triad _______________
    // bass
    let letter1 = '';
    let root = allLetters.indexOf(chord);
    if (shFl === '#') {
        root = (allLetters.indexOf(chord)+1);
        letter1 = allLetters[root];
    } else if (shFl === 'b' && chord === 'C')  {
        letter1 = 'B';
        root = (allLetters.indexOf('B'));
    } else if (shFl === 'b') {
        root = (allLetters.indexOf(chord)-1);
        letter1 = allLetters[root];
    } else {
        root = allLetters.indexOf(chord);
        letter1 = allLetters[root];
    }
    triadObj.root = letter1;

    // middle
    let letter2 = '';
    let second = root+4;
    if (isMinor) {
        second += 11;
    } else if (isSuspended) {
        console.log(susCh);
        if (susCh === "2") {
            second += 10;
        } else {second += 1}
    } 
    letter2 = allLetters[second];
    triadObj.middle = letter2;

    // fifth
    let letter3 = '';
    let fifth = root+7;
    letter3 = allLetters[fifth];
    triadObj.fifth = letter3;

    // finish Triad _______________

    triad = `${letter1}, ${letter2}, ${letter3}`;

    // addMore ___________________ GOTTA FIIX IT
    const nameToLetter = (value) => {
        position = 0;
        switch (value) {
            case '2':
                position += 2;
                break;
            case '2M':
                position += 3;
                break;
            case '4':
                position += 5;
                break;
            case '4M':
                position += 6;
                break;
            case '6':
                position += 8;
                break;
            case '6M':
                position += 9;
                break;
            case '7':
                position += 10;
                break;
            case '7M':
                position += 11;
                break;
            case '9':
                position += 2;
                break;
            case '9M':
                position += 3;
                break;               
        }
        note = allLetters[root+position];
        return note;
    };
    
    if (addedNum) {
        letterXtra.addOne = nameToLetter(addValue);
        triad += `, ${letterXtra.addOne}`;
    } else {letterXtra.addOne = '';}
    triadObj.add1 = letterXtra.addOne;

    if (addedNum2) {
        letterXtra.addTwo = nameToLetter(addValue2);
        triad += `, ${letterXtra.addTwo}`;
    } else {letterXtra.addTwo = '';}
    triadObj.add2 = letterXtra.addTwo;

    if (addedNum3) {
        letterXtra.addThree = nameToLetter(addValue3);
        triad += `, ${letterXtra.addThree}`;
    } else {letterXtra.addThree = '';}
    triadObj.add3 = letterXtra.addThree;

    // add Bass
    if (difBass) {
        triad += `, Bass:${bassDif}`;
    } 
    triadObj.bass = bassDif;

    // save CHORD _____________
    
}

function drawGuitar(tri) {


    // set up notes as variables
    let first = tri.root;
    let second = tri.middle;
    let third = tri.fifth;
    let bass = tri.bass;
    let x1;
    let x2;
    let x3;

    if (addedNum) {
        x1 = tri.add1;
    }
    if (addedNum2) {
        x2 = tri.add2;
    }
    if (addedNum3) {
        x3 = tri.add3;
    }

    // Create group to print
    let fRoot = first;
    let fOthers = [second, third];
    if (difBass) {fOthers.push(bass)};
    if (addedNum) {fOthers.push(x1)};
    if (addedNum2) {fOthers.push(x2)};
    if (addedNum3) {fOthers.push(x3)};

    // as doc.Selec doesnt accept # in idName, will have to change to C2
    // -root
    if (fRoot[1] == '#') {
        fRoot = fRoot[0]+'2';
    }
    // -others
    for (item in fOthers){
        let x = fOthers[item];
        if (x[1] == '#') {
            x = x[0]+'2';
        } 
        fOthers[item] = x;
    } 
    // Remove previous colors
    let previous = document.querySelectorAll('td');
    let a = 0;
    for (cell in previous) {
        let cell = previous[a];
        console.log(a)
        console.dir(cell);
        cell.style.backgroundColor = ''; 
        cell.style.color = '';
        if (a <= 76) {a++}
        else {break}
    }
     
    
    // Set colors to root note
    let id = 'tbody #'+fRoot;
    let redR = document.querySelectorAll(id);
    let max = redR.length;

    for (let i = 0; i < max; i++) {
        let every = redR[i];
        every.style.backgroundColor = 'red';
        every.style.color = 'white';
    }
    
    // Set colors for other notes
    let list1 = ['#fe4848', '#ff7979', 'orange', 'orange', 'orange'];
    for (item in fOthers) {
        console.dir(item);
        let id2 = '#'+fOthers[item];
        let redO = document.querySelectorAll(id2);
        let max2 = redO.length;
        for (let i = 0; i < max2; i++) {
            let every = redO[i];
            every.style.backgroundColor = list1[item];
            every.style.color = 'black';
        }
    }


    // clean other cells
    a = 0;
    for (cell in previous) {
        let cell = previous[a];
        if (cell.style.backgroundColor == '') {
            cell.style.color = 'gray';
            cell.style.backgroundColor = 'black';
        }
        if (a <= 76) {a++}
        else {break}
    }
}

// ------------------------------ OTHER FUNCTIONS ---------------------------

// Test UPDATE button functionality

function canI() {
    document.querySelectorAll('td').innerHTML = '';
    finalValue = document.querySelector('#finCh');
    chordWnotes = document.querySelector('#chordTriad');
    if (finalValue.innerHTML === 'Chord') {alert('Please select a ROOT!!!')}
    else {
        formChord()
        chordWnotes.innerHTML = `${fullName} - Notes: ${triad}`;
        
    }
}

// Test THE CHORDS button functionality
function canI2() {
    finalValue = document.querySelector('#finCh');
    chordWnotes = document.querySelector('#chordTriad');
    if (finalValue.innerHTML === 'Chord') {alert('Please select a ROOT, then click UPDATE!!!')}
    else if (finalValue.innerHTML != 'Chord' && chordWnotes.innerHTML === 'THE CHORDS') {
        alert('Please click UPDATE before clicking here!!!')
    }
    else {
        drawGuitar(triadObj);
    }
}

// CLEAR button
const reloadPage = () => {location.reload()}

// ADD NUMBER functionality
const showXtra = () => {
    let add1 = document.querySelector('#xtraAdd');
    let add2 = document.querySelector('#xtraAdd2');
    if (add1.style.display === '') {
        add1.style.display = 'block';
        document.querySelector('#removeSection').style.display = 'block';
    } else if (add1.style.display != '') {
        add2.style.display = 'block';
        document.querySelector('#addSection').style.fontSize = '20px';
        document.querySelector('#addSection').innerHTML = " (No more, c'mon) ";
    } 
}
function removeSect() {
    let take1 = document.querySelector('#xtraAdd');
    let take2 = document.querySelector('#xtraAdd2');
    if (take2.style.display == 'block') {
        take2.style.display = '';
        document.querySelector('#addSection').style.fontSize = '20px';
        document.querySelector('#addSection').innerHTML = "+";
    } else {
        take1.style.display = '';
        document.querySelector('#removeSection').style.display = '';
    }
}

// Tests if VALUES IN OBJECT are EMPTY or are UNDEFINED
const testValues = value => {
    if (value != '' && value != 'undefined') {
        return true;
    } else {return false}
}
let hi;


// ALERT for INFO icon
const alertSus = () => {alert('Cannot have suspended and minor together!')}