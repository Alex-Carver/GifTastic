      // array for animals
var animals = ["Dog", "Cat", "Hippo", "Lion", "Giraffe", "Aligator","Bird", "StingRay", "Shark", "Dolphin", "Turtle", "Hamster","Skunk", "Ardvark", "Penguin", "Bat", "Snake", "Monkey","Gorilla", "Walrus", "Seal", "Pig", "Otter", "Tiger","Cheetah"];


$( document ).ready(function(){

  // Append Intial animal buttons
  renderButtons();

  // display animal Giphy on selected animal button
  $(document).on('click', '.animalButton', displayAnimalGif);


  $(document).on('click', '.gifContainer', showGifHideImage);


  // Append Animal Buttons to DOM
  function renderButtons(){ 

    // Prevents duplicates
    $('#animalButtons').empty();

    // Loops through the array of animals
    for (var i = 0; i < animals.length; i++){

      // generate a button for each animal in the array 
        var animalButton = $('<button>') 
        animalButton.attr('data-name', animals[i]); // data-attribute
        animalButton.addClass('animalButton'); // class 
        animalButton.text(animals[i]); //button text
        $('#animalButtons').append(animalButton); // Added button to the HTML
    }
  }

  // Add new animals
  $('#addAnimal').on('click', function(){

    // Grab the input from the textbox
    var newAnimal = $('#animalInput').val().trim().toLowerCase();


    // user input
    var isUnique = true;
    for(var i = 0; i < animals.length; i++){
      if(animals[i] == newAnimal){
        isUnique = false;
      }
    }

    // Add new button 
    if(newAnimal == ""){
      alert("Sorry. No empty buttons are allowed!")
    }
    else if(isUnique){

      // Add the new animal to the original list
      animals.push(newAnimal);

      // Add new buttons to the DOM
      renderButtons();
    }
    else{
      alert("You already have a " + newAnimal + " button!")
    }
    // Remove the default features of the Submit Button
    return false;
  })

  // Collect Animal gif from GIPHY and display it when clicked
  function displayAnimalGif(){

    // Deletes gifs
    $('#animalImages').empty();

    // Collect animal name data attribute from the button
    var animal = $(this).attr('data-name').replace(/ /g, '+');

    //API URL
    var publicKey = "dc6zaTOxFJmzC"; // Public API Key
    var limit = "10"; // Limit API to 10 gifs
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=" + limit + "&api_key=" + publicKey;


    // AJAX call for animal buttons
    $.ajax({url: queryURL, method: 'GET'}).done(function(response){

      // Colects animal object data
      for(var i = 0; i < response.data.length; i++){

        // Collect the animal gif URLs
        var currentStillURL = response.data[i].images.fixed_height_still.url; // still image 
        var currentMovingURL = response.data[i].images.fixed_height.url; // moving image

        // Collects Ratings
        var currentRating = response.data[i].rating;

          // for empty rating
          if(currentRating == ""){
            currentRating = "none";
          }


        // Gif and Rating
        var currentGifDiv = $('<div>');
        currentGifDiv.addClass('gifContainer'); // Added a class
        currentGifDiv.attr('data-name', "unclicked"); // Added a Data Attributed for clicked
        
        // Append Rating to current gif
        var currentGifRating = $('<h1>');
        currentGifRating.text("Rating: " + currentRating);
        currentGifDiv.append(currentGifRating);

        // Append Still Image
        var currentGifImage = $('<img>');
        currentGifImage.addClass('still_gif'); // Added a class for still gif
        currentGifImage.attr("src", currentStillURL);
        currentGifDiv.append(currentGifImage);

        // Append Moving Gif Image
        var currentGif = $('<img>')
        currentGif.addClass('moving_gif'); // Added a class for animated gif
        currentGif.attr("src", currentMovingURL);
        currentGif.hide(); // Hide the moving gif
        currentGifDiv.append(currentGif);

        // Append current Div to the DOM
          $('#animalImages').append(currentGifDiv);

      }

    }); 
  }
  
  // Display the Moving gif and Hide the still Image 
  function showGifHideImage(){

    // Determine if the gif was already clicked
    var clickTest = $(this).attr('data-name');
    
    // If Gif isn't clicked hide the still image & display the moving image
    if(clickTest == "unclicked"){

      var gifChildren = $(this).children();

      // Hide Still Image
      $(gifChildren[1]).hide();

      // Display the Moving Image
      $(gifChildren[2]).show();

      // Change Data Name to clicked
      $(this).attr('data-name', "clicked");

    }
    // Already clicked, hides the moving image & shows the still image
    else{

      var gifChildren = $(this).children();

      // Hide the Moving Image
      $(gifChildren[2]).hide();

      // Display the Still Image
      $(gifChildren[1]).show();

      // Change Data Name to unclicked
      $(this).attr('data-name', "unclicked");

    }
  
  }
});