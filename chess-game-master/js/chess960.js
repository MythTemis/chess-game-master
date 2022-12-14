window.onload = function(){
    var w = window.innerWidth || 360;
    var h = window.innerHeight || 500;

    var tsw = (w > h) ? h : w;

    var sw = (tsw - 16)/8;

    var container = document.getElementById("container");
    for(var n = 0; n < 64; n++){
        var square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("s"+n);
        square.style.height = sw + 'px';
        square.style.width = sw + 'px';
        square.style.top = 7+(h-tsw)/2+sw*(Math.floor(n/8)) + 'px';
        square.style.left = 7+(w-tsw)/2+sw*(Math.floor(n%8)) + 'px';
        square.style.fontSize = sw*3/4 + 'px';
        container.appendChild(square);
    }

    var fonts = {
        'k' : '&#9818;', //black king
        'q' : '&#9819;',  //black queen 
        'r' : '&#9820', // black rook
        'b' : '&#9821', // black bishop
        'n' : '&#9822', //black knight
        'p' : '&#9823', //black pawn

        'l' : '&#9812;', // white king
        'w' : '&#9813;', //white queen 
        't' : '&#9814',  //white rook
        'v' : '&#9815', //white bishop
        'm' : '&#9816', //white knght
        'o' : '&#9817', //white pawn 

    }

    var ck = false;
    var cr1 = false;
    var cr2 = false;
    var cl;


//------------------------------------------------------------
 
//Note: create a chess graph that has empty pieces
var values = []
 
//Note: function for randomize array 
function randomArrayShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
 
//Note: array that stores index for black chess pieces in the chess graph
var index = ["0","1","2","3","4","5","6","7"]
//Note: array that stores chess pieces (king,queen,rook,knight,bishop,rook,knight,bishop)
var chessPieces = ["k","q","r","n","b","r","n","b"]
 

//Note: logic for chess960
function chess960(){
 
    //shuffle index array and chesspieces array
    var randomIndex = ( randomArrayShuffle(index))
    var randomChessPieces = ( randomArrayShuffle(chessPieces))
 
    //because pawn just gonna stay in the same position for both sides 
    //for loop to place all the black pawns and white pawns in the same 
    //index in the chess graph
    for(let i = 0; i < 64; i++){
        if(i > 7 && i < 16  ){
            values.push("p");
        }else if(i > 47 && i < 56){
            values.push("o");
        }
        else{
            values.push(0);
        }
    }


    var rookPosition = []
    var kingPostion;
    var checkPostion;

 
    //Randomly place k,q,n,b,r in index from 0 - 7
    function randomPostion(){

        for(i = 0; i < 8; i++){
            values[randomIndex[i]] = randomChessPieces[i];
   
            if(values[randomIndex[i]] == "r"){
                rookPosition.push(randomIndex[i]);
            }
   
            if(values[randomIndex[i]] == "k"){
                kingPostion = randomIndex[i];
            }

            //console.log("black index " + randomIndex[i]);
            //console.log("black chess piece " + randomChessPieces[i]);
           }
    }
 
    randomPostion();

        //console.log("Rook Postion: " + rookPosition)
        //console.log("King Postion: " + kingPostion)
 

        //checking if the king is between 2 rooks 
        if(rookPosition[0] > kingPostion){
         if(rookPosition[1] < kingPostion){
             checkPostion = true;
         }else{
             checkPostion = false;
            }
        }else if(rookPosition[0] < kingPostion){
         if(rookPosition[1] > kingPostion){
             checkPostion = true;
         }else{
             checkPostion = false;
            }
        }else{
         checkPostion = false;
        }


        //console.log(checkPostion)

        
       if(checkPostion == false){
        chess960();
       }
 
       //Mirror of the black side 
       for(i = 0; i < 8; i++){
        //console.log(here[i]);
        //console.log("white" + randomIndex[i]);
 
        if(randomIndex[i] == "0" ){
            randomIndex[i] = "56";
        }else if(randomIndex[i] == "1" ){
            randomIndex[i] = "57";
        }else if(randomIndex[i] == "2" ){
            randomIndex[i] = "58";
        }else if(randomIndex[i] == "3" ){
            randomIndex[i] = "59";
        }else if(randomIndex[i] == "4" ){
            randomIndex[i] = "60";
        }else if(randomIndex[i] == "5" ){
            randomIndex[i] = "61";
        }else if(randomIndex[i] == "6" ){
            randomIndex[i] = "62";
        }else if(randomIndex[i] == "7" ){
            randomIndex[i] = "63";
        }
 
        if(randomChessPieces[i] == "k" ){
            randomChessPieces[i] = "l";
        }else if(randomChessPieces[i] == "q" ){
            randomChessPieces[i] = "w";
        }else if(randomChessPieces[i] == "r" ){
            randomChessPieces[i] = "t";
        }else if(randomChessPieces[i] == "n" ){
            randomChessPieces[i] = "m";
        }else if(randomChessPieces[i] == "b" ){
            randomChessPieces[i] = "v";
        }
 
        values[randomIndex[i]] = randomChessPieces[i];
 
        //console.log("white " + randomIndex[i]);
        //console.log("white " + randomChessPieces[i]);
       } 
}
 
 
   
 chess960();
    
     //Unit test to check if all pawns are in the right location 
 console.log("Pawns Unit Test:")
 var pawnsTest;
 for(i = 7; i < 15; i++){
    if(values[i] == "p"){
        pawnsTest = true;
    }else{
        pawnsTest = false;
    }
 }

 console.log(pawnsTest)

 //Unit test to check if there are two knights place in the black side randomly 
 console.log("Knights Unit Test:")
 var knightsTest;
 if(knightNumber >= 2){
    knightsTest = true;
 }else{
    knightsTest = false;
 }
 console.log(knightsTest)


 //Unit test to check if king is between two rooks
 console.log("King and Rooks Unit Test:")
 
 var kingRooksTest;
 if(rookPositionCheck[0] > kingPostionCheck){
    if(rookPositionCheck[1] < kingPostionCheck){
        kingRooksTest = true;
    }
 }else if(rookPositionCheck[0] < kingPostionCheck){
    if(rookPositionCheck[1] > kingPostionCheck){
        kingRooksTest = true;
    }
 }else{
    kingRooksTest = false;
 }
 
 console.log(kingRooksTest)

 //Unit test to check if king and queen in the white side are the same as the black side
 console.log("Both side queens Unit Test: ")
 var bothSideCheck;
 if(queenPostionCheck == 0){
    if(values[56] == 'w'){
        bothSideCheck = true;
    }else{
        bothSideCheck = false;
    }
 }
 if(queenPostionCheck == 1){
    if(values[57] == 'w'){
        bothSideCheck = true;
    }
 }
 if(queenPostionCheck == 2){
    if(values[58] == 'w'){
        bothSideCheck = true;
    }else{
        bothSideCheck = false;
    }
 }
 if(queenPostionCheck == 3){
    if(values[59] == 'w'){
        bothSideCheck = true;
    }else{
        bothSideCheck = false;
    }
 }
 if(queenPostionCheck == 4){
    if(values[60] == 'w'){
        bothSideCheck = true;
    }else{
        bothSideCheck = false;
    }
 }
 if(queenPostionCheck == 5){
    if(values[61] == 'w'){
        bothSideCheck = true;
    }else{
        bothSideCheck = false;
    }
 }
 if(queenPostionCheck == 6){
    if(values[62] == 'w'){
        bothSideCheck = true;
    }else{
        bothSideCheck = false;
    }
 }
 if(queenPostionCheck == 7){
    if(values[63] == 'w'){
        bothSideCheck = true;
    }else{
        bothSideCheck = false;
    }
 }

 console.log(bothSideCheck);

 
 
 
//------------------------------------------------------------------




    var sqs = document.getElementsByClassName("square");

    for(var n = 0; n < 64; n++){
        if(values[n] !== 0){
           sqs[n].innerHTML = fonts[values[n]];
        }
        sqs[n].addEventListener("click",check);
    }

    function updateSquarecolor(){
        for(var n = 0; n < 64; n++){
            if(Math.floor(n/8)%2 === 0){
                if(n%2 === 0){
                    sqs[n].style.background = '#B8BACF';
                }
                else {
                    sqs[n].style.background = '#293241';
                }
            }
            else {
                if(n%2 === 1){
                    sqs[n].style.background = '#B8BACF';
                }
                else {
                    sqs[n].style.background = '#293241';
                }
            }
        }
    }

    updateSquarecolor();

    var moveable = false;
    var moveTarget = "";
    var moveScopes = [];


    function checkBlack(n,values){
        var target = values[n];
        var scopes = [];
        var x = n;

        if(target === "o"){
            x -= 8;
            if("prnbkq".indexOf(values[x-1]) >= 0 && x%8 != 0){
                scopes.push(x-1);
            }
            if("prnbkq".indexOf(values[x+1]) >= 0 && x%8 != 7){
                scopes.push(x+1);
            }
            if(x >= 0 && values[x] === 0){
                scopes.push(x);
                if(x >= 40){
                    if(x-8 >= 0 && values[x-8] === 0){
                        scopes.push(x-8);
                    }
                }
            }
        }

        else if(target === "t"){
            x = n;
            x -= 8;
            while(x >= 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 8;
            }
            x = n;
            x += 8;
            while(x < 64){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 8;
            }
            x = n;
            x++;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x++;
            }
            x = n;
            x--;
            while(x%8 != 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x--;
            }
        }

        else if(target === "m"){
            x = n;
            if(x%8 > 1 && x%8 < 6){
                x -= 17;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 15;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }

                x = n;
                x -= 10;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 6;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 6;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 10;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 15;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 17;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            else {
                x = n;
                if(x%8 <= 1){
                    x = n;
                    x -= 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 6;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 10;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 === 1){
                    x -= 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                if(x%8 >= 6){
                    x = n;
                    x -= 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 10;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 6;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 === 6){
                    x = n;
                    x -= 15;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
            }
        }

        else if(target === "v"){
            x = n;
            x -= 9;
            while(x >= 0 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 9;
            }
            x = n;
            x += 7;
            while(x < 64 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 7;
            }
            x = n;
            x += 9;
            while(x%8 != 0 && x%8 !== 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 9;
            }
            x = n;
            x -= 7;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 7;
            }
        }

        else if(target === "w"){
            x = n;
            x -= 8;
            while(x >= 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 8;
            }
            x = n;
            x += 8;
            while(x < 64){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 8;
            }
            x = n;
            x++;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x++;
            }
            x = n;
            x--;
            while(x%8 != 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x--;
            }
            x = n;
            x -= 9;
            while(x >= 0 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 9;
            }
            x = n;
            x += 7;
            while(x < 64 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 7;
            }
            x = n;
            x += 9;
            while(x%8 != 0 && x%8 !== 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 9;
            }
            x = n;
            x -= 7;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("prnbqk".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 7;
            }
        }

        else if(target === "l"){
            x = n;
            x += 8;
            if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                scopes.push(x);
            }
            x = n;
            x -= 8;
            if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                scopes.push(x);
            }
            x = n;
            if(x%8 > 0){
                x = n;
                x -= 1;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 9;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }

                x = n;
                x += 7;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            x = n;
            if(x%8 < 7){
                x = n;
                x += 1;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 9;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 7;
                if(("prnbqk".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            x = n;
            if(!ck){
                cl = false;
                if(!cr2){
                //    cl = false;
                    if(values[n+1] === 0 && values[n+2] === 0 && values[n+3] === "t"){
                        scopes.push(x+2);
                        cl = true;
                    }
                }
                if(!cr1){
                //    cl = false;
                    if(values[n-1] === 0 && values[n-2] === 0 && values[n-3] === 0 && values[n-4] === "t"){
                        scopes.push(x-2);
                        cl = true;
                    }
                }
            }
        }
        if(scopes.length) return scopes;
    }

    function checkWhite(n,values){
        var target = values[n];
        var scopes = [];
        var x = n;
        if(target === "p"){
            x += 8;
            if("otmvlw".indexOf(values[x-1]) >= 0 && x%8 != 0){
                scopes.push(x-1);
            }
            if("otmvlw".indexOf(values[x+1]) >= 0 && x%8 != 7){
                scopes.push(x+1);
            }
            if(x < 64 && values[x] === 0){
                scopes.push(x);
                if(x <= 23){
                    if(x+8 >= 0 && values[x+8] === 0){
                        scopes.push(x+8);
                    }
                }
            }
        }

        else if(target === "r"){
            x = n;
            x -= 8;
            while(x >= 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 8;
            }
            x = n;
            x += 8;
            while(x < 64){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 8;
            }
            x = n;
            x++;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x++;
            }
            x = n;
            x--;
            while(x%8 != 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x--;
            }
        }

        else if(target === "n"){
            x = n;
            if(x%8 > 1 && x%8 < 6){
                x -= 17;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 15;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }

                x = n;
                x -= 10;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 6;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 6;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 10;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 15;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 17;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            else {
                x = n;
                if(x%8 <= 1){
                    x = n;
                    x -= 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 6;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 10;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 === 1){
                    x -= 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                if(x%8 >= 6){
                    x = n;
                    x -= 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x -= 10;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 6;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
                x = n;
                if(x%8 === 6){
                    x = n;
                    x -= 15;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                    x = n;
                    x += 17;
                    if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                        scopes.push(x);
                    }
                }
            }
        }

        else if(target === "b"){
            x = n;
            x -= 9;
            while(x >= 0 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 9;
            }
            x = n;
            x += 7;
            while(x < 64 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 7;
            }
            x = n;
            x += 9;
            while(x%8 != 0 && x%8 !== 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 9;
            }
            x = n;
            x -= 7;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 7;
            }
        }

        else if(target === "q"){
            x = n;
            x -= 8;
            while(x >= 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 8;
            }
            x = n;
            x += 8;
            while(x < 64){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 8;
            }
            x = n;
            x++;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x++;
            }
            x = n;
            x--;
            while(x%8 != 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x--;
            }
            x = n;
            x -= 9;
            while(x >= 0 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 9;
            }
            x = n;
            x += 7;
            while(x < 64 && x%8 !== 7){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 7;
            }
            x = n;
            x += 9;
            while(x%8 != 0 && x%8 !== 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x += 9;
            }
            x = n;
            x -= 7;
            while(x%8 != 0){
                if(values[x] === 0){
                    scopes.push(x);
                }
                else if("otmvlw".indexOf(values[x]) >= 0){
                    scopes.push(x);
                    break;
                }
                else {
                    break;
                }
                x -= 7;
            }
        }

        else if(target === "k"){
            x = n;
            x += 8;
            if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                scopes.push(x);
            }
            x = n;
            x -= 8;
            if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                scopes.push(x);
            }
            x = n;
            if(x%8 > 0){
                x = n;
                x -= 1;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 9;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }

                x = n;
                x += 7;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
            x = n;
            if(x%8 < 7){
                x = n;
                x += 1;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x += 9;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
                x = n;
                x -= 7;
                if(("otmvlw".indexOf(values[x]) >= 0 || values[x] === 0) && x < 64 && x >= 0){
                    scopes.push(x);
                }
            }
        }
        if(scopes.length) return scopes;
    }

    var myTurn = true;

    function check(){
        if(myTurn){
            var n = Number(this.classList[1].slice(1));
            var target = values[n];

            var scopes = checkBlack(n,values) || [];

            var x = n;

            if(!moveable){
                if(scopes.length > 0){
                    moveable = true;
                    moveTarget = n;
                    moveScopes = scopes.join(",").split(",");
                }
                else {

                }
            }
            else {
                if(moveScopes.indexOf(String(n)) >= 0){
                    var checkArr = [];
                    var saveKing = false;
                    for(var z = 0; z < 64; z++){
                        checkArr[z] = values[z];
                    }

                    checkArr[n] = checkArr[moveTarget];
                    checkArr[moveTarget] = 0;

                    for(var y = 0; y < 64; y++){
                        if("prnbkq".indexOf(checkArr[y]) >= 0){
                            var checkScp = checkWhite(y,checkArr) || [];
                            for(var z = 0; z < checkScp.length; z++){
                                if(checkArr[checkScp[z]] === 'l'){
                                    if(!saveKing){
                                        alert('Save Your King');
                                        saveKing = true;
                                    }
                                }
                            }
                        }
                    }

                    if(!saveKing){
                        values[n] = values[moveTarget];
                        values[moveTarget] = 0;
                        if(cl){
                            if(n === 62 && moveTarget === 60){
                                values[63] = 0;
                                values[61] = "t";
                            }
                            else if(n === 58 && moveTarget === 60){
                                values[59] = "t";
                                values[56] = 0;
                            }
                        }
                        if(moveTarget === 60){
                            ck = true;
                        }
                        else if(moveTarget === 63){
                            cr2 = true;
                        }
                        else if(moveTarget === 56){
                            cr1 = true;
                        }
                        if(values[n] === "o" && n < 8){
                            values[n] = "w";
                        }
                        moveable = false;
                        scopes = [];
                        myTurn = false;
                        setTimeout(chooseTurn,1000);
                    }
                }
                else {
                    moveScopes = [];
                    moveable = false;
                }
            }

            updateSquarecolor();

            for(var x = 0; x < 64; x++){
                sqs[x].innerHTML = fonts[values[x]];
                if(values[x] === 0){
                    sqs[x].innerHTML = "";
                }
            }

            for(var x = 0; x < scopes.length; x++){
                sqs[scopes[x]].style.background = "#f45";//.classList.add("scope");
            //    alert(scopes)
            }
        }
    }


    var arr = [];

    function chooseTurn(){
        var approved = [];
        var actions = [];
        var effects = [];


        for(var n = 0; n < 64; n++){
            if("prnbqk".indexOf(values[n]) >= 0){
                var scopes = checkWhite(n,values) || [];
                for(var x = 0; x < scopes.length; x++){
                    var tmp = []//values.join(',').split(',');
                    for(var xx = 0; xx < 64; xx++){
                        tmp[xx] = values[xx]
                    }
                    var effect = 0;
                    var action = Math.random()*3;
                    //Action value
                    var actionValue = tmp[scopes[x]];
                    if(actionValue === "l"){
                        action = 100 + Math.random()*3;
                    }
                    else if(actionValue === "w"){
                        action = 50 + Math.random()*3;
                    }
                    else if(actionValue === "v"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "m"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "t"){
                        action = 30 + Math.random()*3;
                    }
                    else if(actionValue === "o"){
                        action = 15 + Math.random()*3;
                    }
                    //Effect value
                    tmp[scopes[x]] = tmp[n];
                    tmp[n] = 0;
                    for(var y = 0; y < 64; y++){
                        if("otmvlw".indexOf(values[y]) >= 0){
                            var tmpScp = checkBlack(y,tmp) || [];
                            for(var z = 0; z < tmpScp.length; z++){
                                var effectValue = tmp[tmpScp[z]];
                                if(effectValue == "k"){
                                    if(effect < 100){
                                        effect = 100;
                                    }
                                }
                                else if(effectValue == "q"){
                                    if(effect < 50){
                                        effect = 50;
                                    }
                                }
                                else if(effectValue == "b"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "n"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "r"){
                                    if(effect < 30){
                                        effect = 30;
                                    }
                                }
                                else if(effectValue == "p"){
                                    if(effect < 15){
                                        effect = 15;
                                    }
                                }
                            }
                        }
                    }




                    actions.push(action);
                    effects.push(effect);
                    approved.push(n+"-"+scopes[x]);
                }
            }
        }

        //alert(actions);

        var bestEffect = Math.min.apply(null,effects);
        //alert(bestEffect);
        if(bestEffect >= 100){
            alert("You Win");
            setTimeout(function(){
                values = ['r','n','b','q','k','b','n','r','p','p','p','p','p','p','p','p',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'o','o','o','o','o','o','o','o','t','m','v','w','l','v','m','t'];
        },100);
        }

        var tmpA = [];
        var tmpB = [];
        var tmpC = [];
        var bestMove = "";

        for(var n = 0; n < effects.length; n++){
            if(effects[n] === bestEffect){
                tmpA.push(actions[n]);
                tmpB.push(approved[n]);
                tmpC.push(effects[n]);
            }
        }
        bestMove = tmpB[tmpA.indexOf(Math.max.apply(null,tmpA))];
    //    alert(effects)
        //alert(bestMove);


        if(bestMove){
            values[Number(bestMove.split("-")[1])] = values[Number(bestMove.split("-")[0])];
            values[Number(bestMove.split("-")[0])] = 0;
            if(values[Number(bestMove.split("-")[1])] === "p" && Number(bestMove.split("-")[1]) >= 56){
                values[Number(bestMove.split("-")[1])] = "q";
            }

            sqs[bestMove.split("-")[1]].style.background = '#aaf';
            sqs[bestMove.split("-")[0]].style.background = '#aaf';

            for(var x = 0; x < 64; x++){
                //sqs[x].style.background = "#afa"//classList.add("scope");
                sqs[x].innerHTML = fonts[values[x]];
                if(values[x] === 0){
                    sqs[x].innerHTML = "";
                }
            }
            myTurn = true;
        }
        else {
            //alert('You Win');
        }
    }
}
//chooseTurn();
