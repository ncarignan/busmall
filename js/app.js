'use strict';

var imageTableTag = document.getElementById('image-table');
var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');



var ImageObject = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  ImageObject.allImages.push(this);
};

ImageObject.allImages = [];




var imageClickedOn = function (event) {
  console.log (event.target);
};

//image1 
imageTableTag.addEventListener('click', imageClickedOn);

new ImageObject('Bag', './img/bag.jpg');
new ImageObject('Banana', './img/banana.jpg');
new ImageObject('Bathroom', './img/bathroom.jpg');
new ImageObject('Boots', './img/boots.jpg');
new ImageObject('Breakfast', './img/breakfast.jpg');
new ImageObject('Bubblegum', './img/bubblegum.jpg');
new ImageObject('Chair', './img/chair.jpg');
new ImageObject('Cthulhu', './img/cthulhu.jpg');
new ImageObject('Dog-duck', './img/dog-duck.jpg');
new ImageObject('Dragon', './img/dragon.jpg');
new ImageObject('Pen', './img/pen.jpg');
new ImageObject('Pet-sweep', './img/pet-sweep.jpg');
new ImageObject('Scissors', './img/scissors.jpg');
new ImageObject('Shark', './img/shark.jpg');
new ImageObject('Sweet', './img/sweep.png');
new ImageObject('Tauntaun', './img/tauntaun.jpg');
new ImageObject('Unicorn', './img/unicorn.jpg');
new ImageObject('USB', './img/usb.gif');
new ImageObject('Water can', './img/water-can.jpg');
new ImageObject('Wine glass', './img/wine-glass.jpg');



var j=0;
// imageStatus is an array keeps track of which images have been clicked on in the previous round and which images are currently being displayed
var imageStatus = [];
// imagesToDisplay is an array holds three image objects 
var imagesToDisplay = [];

for (var i=0; i <ImageObject.allImages.length; i++){
  imageStatus.push(0);
}

var pickThreeImages = function() {

  j=0;

  while (j<3) {
    var randomIndex = Math.floor(Math.random() * (ImageObject.allImages.length - 1)); 

    // randomIndex = 0 : good to use
    // randomIndex = 1 : chosen
    // randomIndex = 2 : clicked on in last round

    if (imageStatus[randomIndex] === 0){
      imagesToDisplay[j]= ImageObject.allImages[randomIndex];
      //console.log ('url: ' + ImageObject.allImages[randomIndex].url);
      imageStatus[randomIndex]=1;
      j++;
    // } else {
    //   console.log('used!');
    }
  }
  
  image1.src = imagesToDisplay[0].url;
  image2.src = imagesToDisplay[1].url;
  image3.src = imagesToDisplay[2].url;

};

pickThreeImages();


