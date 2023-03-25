
//---------------------------------------------------------------------------------------------------INITIAL VARIABLES------------------------------------------


let circle = document.querySelector('#cat_image')                       //retrieving the text by its Id and storing it variable called circle
let display1 = document.getElementById("Counter")                       //retrieving the text by its Id and storing it variable called display1
let myAutoButton = document.getElementById("BuyAutoClicker")            //retrieving the button by its Id and storing it variable called myAutoButton
let display2 = document.getElementById("AutoCounter")                   //retrieving the text by its Id and storing it variable called display2
let multiplierbutton = document.getElementById("multiplierbutton")      //retrieving the button by its Id and storing it variable called multiplierbutton
let display3 = document.getElementById("Multiplier")                    //retrieving the text by its Id and storing it variable called display3
let display4 = document.getElementById("Cost")                          //retrieving the text by its Id and storing it variable called display4
let display5 = document.getElementById("AutoCounter1")                  //retrieving the text by its Id and storing it variable called display5



let count = 0.00                                                        //storing count in a variable count
let autoClickerCost = 20.00                                             //starting cost of the autoclicker
let autocount = 0                                                       //making a count variable and starting it of zero
let multipliercost = 20.00                                              //starting cost of the autoclicker
let multipliercount = 1.00                                              //storing multiplier count 
display4.innerHTML = "COST: " + multipliercost + " FUN";                //starting cost that you see on the screen
display5.innerHTML = "COST: " + autoClickerCost + " FUN";               //starting cost that you see on the screen

//---------------------------------------------------------------------------------------------------IMAGE VARIABLES------------------------------------------

const images = ["/images/Cat1.png", "/images/Cat2.png",                 //images that will alternate per different amounts of fun score. stored in array.
"/images/Cat3.png", "/images/Cat4.png", "/images/Cat5.png", 
"/images/Cat6.png", "/images/Cat7.png", "/images/Cat8.png",
"/images/Cat9.png", "/images/Cat10.png", "/images/Cat11.png", 
"/images/Cat12.png", "/images/Cat13.png", "/images/Cat14.png",
"/images/Cat15.png", "/images/Cat16.png", "/images/Cat17.png",
"/images/Cat18.png", "/images/Cat19.png", "/images/Cat20.png",
"/images/Cat21.png"];
let imageCount = 0;                                                     //starting image count
let imagemax = images.length;                                           //setting endpoint of images
circle.src = images[imageCount];                                        //storing image array in a variable 
const imagevalue = [20,35,50,75,100,150,200,250,300,350,400,450,
    500,550,600,650,700,750,800,850,900,1000];                          //array of fun level score points
let imagevaluecount = 0;
let imagevaluemax = imagevalue.length;

//---------------------------------------------------------------------------------------------------AUDIO VARIABLES-------------------------------------------

let audioflag = false;                                                  //setting audio flag to make sure sounds dont overlap or get backed up
let cataudioflag = false;

const audio = new Audio();                                              //audio variable for purchase sound
audio.src = "/Sounds/purchase.wav";

const cataudio = new Audio();                                           //audio variable for cat meowing sound
cataudio.src = "/Sounds/angrycat.mp3";

const pushbutton = new Audio();                                         //audio variable for push button sound
pushbutton.src = "/Sounds/pop.flac";

//---------------------------------------------------------------------------------------------------BASIC INCREMENTING----------------------------------------

circle.addEventListener('click', increment)                             //adding "click" event listener to the circle and assigning it function (increment) to

function increment() {                                                  //preventing meow sound from incrementing by using audioflag variable
    if (cataudioflag == false) {
        cataudioflag = true;
        // cataudio.play(); 
        cataudioflag = false;
    }

    count = count + multipliercount;                                    //adding click count with miltiplier count
    display1.innerHTML = "FUN LEVEL :" + count;                         //telling display to show string "Number of Clicks" and current count.
    if (imagevalue[imagevaluecount] <= count) {                         
        imagevaluecount++;                                              //incrementing image count
        if (imagevaluecount == imagevaluemax - 1) {
            imagevaluecount--;
        }
        if (imageCount == imagemax - 1) {
            imageCount = imagemax - 1;
        }
        else {
            imageCount++;
        }
        circle.src = images[imageCount];
        cataudio.play();
    }
}

//----------------ADDING AUTOCLICKER-------------------------------------------------------------------------------------------------------------

myAutoButton.addEventListener('click', autoincrement)                   //adding "click" event listener to the cimage and assigning it function (autoincrement) to

function autoincrement() {
    if (count >= autoClickerCost) {                                     //if statement prevents purchase of clicks if count is lower then cost                  
        buyingAutoClicker();
        if (!audioflag) {                                               //making sure audio is in check and doesnt repeat
            audioflag = true;
            audio.play();
            audioflag = false;
        }
        setInterval(function () { autoclicker() }, 1000);               //this will add clicks automatically every second
        display1.innerHTML = "FUN LEVEL: " + count;                     //this will display and update the fun count
        display5.innerHTML = "COST: " + autoClickerCost;                //this will display and update the cost
    }
    else {
        display2.innerHTML = 'NOT ENOUGH FUN';                          //will display if you dont have enough clicks
    }
}

function autoclicker() {                                                //simply referencs increment function
    cataudioflag = true;                                                //smaking sure it doenst increment audio
    increment();
    cataudioflag = false;
}

function buyingAutoClicker() {                                          // function to buy Auto Clicker
    count = count - autoClickerCost;
    autoClickerCost = autoClickerCost * 1.5;                              // redefining clicker cost to add 10%    
    autocount = autocount + multipliercount;                            // incrementing that change    
    display2.innerHTML = autocount + '/CLICK';
}


//----------------ADDING MULTIPLIER------------------------------------------------------------------------------------------------------------


multiplierbutton.addEventListener('click', multiplier)                  //adding "click" event listener to the button and assigning it a function 

function multiplier() {
    if (count >= multipliercost) {                                      //function to make sure you cant buy if not enought clicks
        buyingmultiplier();
        if (!audioflag) {                                               //making sure audio doenst backup
            audioflag = true;
            audio.play();
            audioflag = false;
        }
        display4.innerHTML = "COST: " + multipliercost + " FUN";        //displaying multiplier cost
        display1.innerHTML = "FUN LEVEL: " + count;                     //updating fun count after purchase
    }
    else {
        display3.innerHTML = 'NOT ENOUGH FUN';                          //will display if you dont have enough clicks
    }
}

function buyingmultiplier() {                                           // buying multiplier function
    count = count - multipliercost;                                     
    multipliercost = multipliercost * 1.5;                              // redefining clicker cost to add 10%    
    multipliercount = multipliercount * 1.5;                            // displaying multiplier rate 
    display3.innerHTML = "X " + multipliercount;
}

//----------------EXTRAS-------------------------------------------------------------------------------------------------------------

function resetData() {                                                  // simply resets the page and the game 
    window.location.reload();
}

function buttonsound() {                                                // button click sound  
    pushbutton.play();
}