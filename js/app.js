'use strict';

// GLOBAL VARIABLES

var myChart = null;
var imageTableTag = document.getElementById('image-table');
var buttonTableTag = document.getElementById('button-table');
var restartButtonTag = document.getElementById('restart-voting');
var dataDivTag = document.getElementById('data');
var image1 = document.getElementById('image1');
var image2 = document.getElementById('image2');
var image3 = document.getElementById('image3');
var indexesOfThreeOnPage = [];
var numberOfImagesClicked = 0;
var maxClicks = 7;

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
// new ImageObject('Chair', './img/chair.jpg');
// new ImageObject('Cthulhu', './img/cthulhu.jpg');
// new ImageObject('Dog-duck', './img/dog-duck.jpg');
// new ImageObject('Dragon', './img/dragon.jpg');
// new ImageObject('Pen', './img/pen.jpg');
// new ImageObject('Pet-sweep', './img/pet-sweep.jpg');
// new ImageObject('Scissors', './img/scissors.jpg');
// new ImageObject('Shark', './img/shark.jpg');
// new ImageObject('Sweet', './img/sweep.png');
// new ImageObject('Tauntaun', './img/tauntaun.jpg');
// new ImageObject('Unicorn', './img/unicorn.jpg');
// new ImageObject('USB', './img/usb.gif');
// new ImageObject('Water can', './img/water-can.jpg');
// new ImageObject('Wine glass', './img/wine-glass.jpg');



// populate imageStatus with zeros
for (var i = 0; i < ImageObject.allImages.length; i++) {
  imageStatus.push(0);
}

// Function to display the three images up for voting
var pickThreeImages = function () {

  var j = 0;
  //console.log(numberOfImagesClicked);
  numberOfImagesClicked++;

  while (j < 3) {
    var randomIndex = Math.floor(Math.random() * (ImageObject.allImages.length));

    // randomIndex = 0 : good to use
    // randomIndex = 1 : chosen in this or previous round

    if (imageStatus[randomIndex] === 0) {
      indexesOfThreeOnPage[j] = randomIndex;
      imageStatus[randomIndex] = 1;
      ImageObject.allImages[randomIndex].timesShown++;
      j++;
    }
  }

  //reset imageStatusArray to clear previou images
  for (var i = 0; i < ImageObject.allImages.length; i++) {

    if (i === indexesOfThreeOnPage[0] || i === indexesOfThreeOnPage[1] || i === indexesOfThreeOnPage[2]) {
      imageStatus[i] = 1;
      ImageObject.allImages[i].timesShown++;
    } else { imageStatus[i] = 0; }
  }

  // Renders the three images

  image1.src = ImageObject.allImages[indexesOfThreeOnPage[0]].url;
  image2.src = ImageObject.allImages[indexesOfThreeOnPage[1]].url;
  image3.src = ImageObject.allImages[indexesOfThreeOnPage[2]].url;

  // Checking to see if clicks(votes) exceed upper limit set in the global variables
  if (numberOfImagesClicked > maxClicks) {
    imageTableTag.removeEventListener('click', imageClickedOn);
    hideImageTable();
    pushDataToLocalStorage();
    createChart();
    printImageList();
    localStorage.setItem('clickesReached', '1');
  } else {
    imageTableTag.addEventListener('click', imageClickedOn);
  }

};

var printImageList = function () {

  // Retreive data from local storage
  var chartLabels = JSON.parse(localStorage.getItem('chartLabels'));
  var chartPercentages = JSON.parse(localStorage.getItem('chartPercentages'));
  var clicks = JSON.parse(localStorage.getItem('imageClicks'));
  var imageTimesShown = JSON.parse(localStorage.getItem('imageTimesShown'));
  var imageList = document.getElementById('image-list');

  // Render list of data next to chart
  for (var k = 0; k < ImageObject.allImages.length; k++) {
    var imageListItem = document.createElement('li');
    imageListItem.textContent = clicks[k] + ' out of ' + imageTimesShown[k] + ' votes for the ' + chartLabels[k] + ' (' + chartPercentages[k] + '%)';
    imageList.appendChild(imageListItem);
  }
};

var imageClickedOn = function (event) {

  // Populates an array that holds the indexes of the three images on the pageXOffset
  if (event.target.id === 'image1') {
    ImageObject.allImages[indexesOfThreeOnPage[0]].clicks++;
  } else if (event.target.id === 'image2') {
    ImageObject.allImages[indexesOfThreeOnPage[1]].clicks++;
  } else if (event.target.id === 'image3') {
    ImageObject.allImages[indexesOfThreeOnPage[2]].clicks++;
  }

  pickThreeImages();
};

function pushDataToLocalStorage() {

  var chartLabels = [];
  var chartPercentages = [];
  var imageClicks = [];
  var imageTimesShown = [];

  for (var m = 0; m < ImageObject.allImages.length; m++) {
    chartLabels.push(ImageObject.allImages[m].name);
    chartPercentages.push(Math.floor(ImageObject.allImages[m].clicks / ImageObject.allImages[m].timesShown * 100));
    imageClicks.push(ImageObject.allImages[m].clicks);
    imageTimesShown.push(ImageObject.allImages[m].timesShown);
  }

  // Put chart labels and percentages into local storage
  var chartLablesStringified = JSON.stringify(chartLabels);
  localStorage.setItem('chartLabels', chartLablesStringified);

  var chartPercentagesStringified = JSON.stringify(chartPercentages);
  localStorage.setItem('chartPercentages', chartPercentagesStringified);

  var imageClicksStringified = JSON.stringify(imageClicks);
  localStorage.setItem('imageClicks', imageClicksStringified);

  var imageTimesShownStringified = JSON.stringify(imageTimesShown);
  localStorage.setItem('imageTimesShown', imageTimesShownStringified);

}

function createChart() {

  // Retreive chart labels and percentages from local storage
  var chartLabels = JSON.parse(localStorage.getItem('chartLabels'));
  var chartPercentages = JSON.parse(localStorage.getItem('chartPercentages'));
  console.log (chartPercentages);
  var ctx = document.getElementById('myChart');
  if(myChart){
    myChart.data.datasets[0].data = chartPercentages;
    myChart.update();
  } else {

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: '# of Votes',
          data: chartPercentages,
          backgroundColor: [
            'rgba(78,32,243,.6)',
            'rgba(32,164,243, .6)',
            'rgba(73,211,63,.6)',
            'rgba(255,231,76,.6)',
            'rgba(241,113,5,.6)',
            'rgba(78,32,243,.6)',
            '#rgba(32,164,243, .6)',
            'rgba(73,211,63,.6)',
            'rgba(255,231,76,.6)',
            'rgba(241,113,5,.6)',
            'rgba(78,32,243,.6)',
            '#rgba(32,164,243, .6)',
            'rgba(73,211,63,.6)',
            'rgba(255,231,76,.6)',
            'rgba(241,113,5,.6)',
            'rgba(78,32,243,.6)',
            '#rgba(32,164,243, .6)',
            'rgba(73,211,63,.6)',
            'rgba(255,231,76,.6)',
            'rgba(241,113,5,.6)'
          ],
          borderColor: [
            'rgba(78,32,243,1)',
            'rgba(32,164,243, 1)',
            'rgba(73,211,63,1)',
            'rgba(255,231,76,1)',
            'rgba(241,113,5,1)',
            'rgba(78,32,243,1)',
            '#rgba(32,164,243, 1)',
            'rgba(73,211,63,1)',
            'rgba(255,231,76,1)',
            'rgba(241,113,5,1)',
            'rgba(78,32,243,1)',
            '#rgba(32,164,243, 1)',
            'rgba(73,211,63,1)',
            'rgba(255,231,76,1)',
            'rgba(241,113,5,1)',
            'rgba(78,32,243,1)',
            '#rgba(32,164,243, 1)',
            'rgba(73,211,63,1)',
            'rgba(255,231,76,1)',
            'rgba(241,113,5,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}

// Hides voting options
var hideImageTable = function () {
  imageTableTag.classList.replace('show-table','hide-table');
  buttonTableTag.classList.replace('hide-table','show-table');
  dataDivTag.classList.replace('hide-table','show-table');
};

// Shows image table and restarts voting
restartButtonTag.addEventListener('click', function(event){
  //event.preventDefault();
  imageTableTag.classList.replace('hide-table','show-table');
  buttonTableTag.classList.replace('show-table','hide-table');
  // dataDivTag.classList.replace('show-table','hide-table');

  numberOfImagesClicked = 0;
  console.log(numberOfImagesClicked);
  localStorage.clear();
  localStorage.setItem('clickesReached', '0');
  imageTableTag.addEventListener('click', imageClickedOn);

});

// Checks to see if maxClicks was previously reached
var checkForData = function(){
  //var maxClicksReachedPreviously =
  if (parseInt(localStorage.getItem('clickesReached')) === 1) {
    hideImageTable();
    createChart();
    printImageList();
  }
};

pickThreeImages();
checkForData();
