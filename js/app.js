'use strict';

// GLOBAL VARIABLES

var imageTableTag = document.getElementById('image-table');
var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');
var indexesOfThreeOnPage =[];
var numberOfImagesClicked = 0;

// threeOnPageArr is a multidimensional array holding information about the three images displayed
// [object 1, index of object 1 in ImageObject.allImages]
// [object 2, index of object 2 in ImageObject.allImages]
// [object 3, index of object 2 in ImageObject.allImages]

var threeOnPageArr = [];

// imageStatus is an array keeps track of which images have shown in the previous & current
var imageStatus = [];

// IMAGE CONSTRUCTOR

var ImageObject = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;

  ImageObject.allImages.push(this);
};

ImageObject.allImages = [];

// CREATING INSTANCES OF THE IMAGE OBJECT

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



// populate imagesObjectOnPage with zeros 
for (var i=0; i <ImageObject.allImages.length; i++){
  imageStatus.push(0);
}

var pickThreeImages = function() {

  var j=0;
  //console.log(numberOfImagesClicked);
  numberOfImagesClicked++;

  while (j<3) {
    var randomIndex = Math.floor(Math.random() * (ImageObject.allImages.length - 1)); 

    // randomIndex = 0 : good to use
    // randomIndex = 1 : chosen

    if (imageStatus[randomIndex] === 0){
      indexesOfThreeOnPage[j] = randomIndex;
      //threeOnPageArr[j] = [ImageObject.allImages[randomIndex], randomIndex];
      imageStatus[randomIndex]=1;
      ImageObject.allImages[randomIndex].timesShown++;
      j++;
    }

  }

  console.log('before reset: ' + imageStatus);

  //reset imageStatusArray
  for (var i=0; i <ImageObject.allImages.length; i++){

    if (i === indexesOfThreeOnPage[0] || i === indexesOfThreeOnPage[1] || i ===  indexesOfThreeOnPage[2]) {
      imageStatus[i]=1;
      ImageObject.allImages[i].timesShown++;
    } else {imageStatus[i]=0;}
  }

  console.log('after reset: ' + imageStatus);

  image1.src = ImageObject.allImages[indexesOfThreeOnPage[0]].url;
  image2.src = ImageObject.allImages[indexesOfThreeOnPage[1]].url;
  image3.src = ImageObject.allImages[indexesOfThreeOnPage[2]].url;

  if (numberOfImagesClicked > 10) {
    imageTableTag.removeEventListener('click', imageClickedOn);
    printImageList();
    //console.log('stop event listener');
  } else {
    imageTableTag.addEventListener('click', imageClickedOn);
    
  }

};

var printImageList = function () {

  var imageList = document.getElementById('image-list');
  for ( var k=0; k<ImageObject.allImages.length; k++){
    var imageListItem = document.createElement('li');
    var percentClicked = ImageObject.allImages[k].clicks / ImageObject.allImages[k].timesShown * 100;
    imageListItem.textContent = ImageObject.allImages[k].clicks +' out of '+ ImageObject.allImages[k].timesShown + ' votes for the ' + ImageObject.allImages[k].name + ' ('+ percentClicked + '%)' ;
    imageList.appendChild(imageListItem );
  }
};

var imageClickedOn = function (event) {

  if(event.target.id === 'image1') {
    ImageObject.allImages[indexesOfThreeOnPage[0]].clicks++;
    console.log(ImageObject.allImages[indexesOfThreeOnPage[0]]);
  } else if (event.target.id === 'image2') {
    ImageObject.allImages[indexesOfThreeOnPage[1]].clicks++;
    console.log(ImageObject.allImages[indexesOfThreeOnPage[1]]);
  } else if (event.target.id === 'image3') {
    ImageObject.allImages[indexesOfThreeOnPage[2]].clicks++;
    console.log(ImageObject.allImages[indexesOfThreeOnPage[2]]);
  }

  pickThreeImages();
};




pickThreeImages();
