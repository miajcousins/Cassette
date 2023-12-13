"use strict"

//checks that the page has loaded properly 
window.addEventListener("load", () => {
   console.log("Update: page has loaded");
   //stores elements of the page to be accessed later in the code 
   const queueContainer = document.querySelector('#queue-container');
   const movieContainer = document.querySelector('#movie-container');
   const arrow = document.querySelector('#arrow');
   const h2 = document.querySelector('#top-header');
   let totalDuration = 0;
   let count = 0;
   
   //allows the user to click on the arrow to take them to the main content of the page
   arrow.addEventListener("click", () => {
      h2.scrollIntoView({behavior:"smooth"});
   });

   movieData.forEach(loadMovie);
   
   //method to add each movie to the page
   function loadMovie(movie) {
      //formats the duration according to the specification  
      let duration = parseInt(movie.duration);
      let formattedDuration = formatDuration(duration);

      //creates a movie box with the information from the JSON file
      let movieBox = document.createElement('div');
      movieBox.className = 'movie-box';
      movieBox.innerHTML = movie.movie_title.toUpperCase() + "\n" + "(" + movie.director_name + ", " + movie.title_year + ", " + formattedDuration + ")";;

      //adds this to the movie container 
      movieContainer.appendChild(movieBox);
 
      //allows the user to click on the movie and add it to their queue
      movieBox.addEventListener("click", () => {
         //adds the movie to the queue container 
         let queueItem = document.createElement('div');
         queueItem.className = 'queue-item';

         let queueMovieBox = document.createElement('div');
         queueMovieBox.className = 'movie-box';
         //uses the information from the movie just clicked
         queueMovieBox.innerHTML = movieBox.innerHTML;
         
         //adds a remove button to the movie
         let removeButton = document.createElement('div');
         removeButton.className = 'remove-button';
         removeButton.innerHTML = "x";

         queueContainer.appendChild(queueItem);
         queueItem.appendChild(queueMovieBox);
         queueItem.appendChild(removeButton);
         
         //increments the total duration 
         totalDuration = totalDuration + duration;
         let durationElement = document.querySelector('#duration');
         let formattedTotalDuration = formatDuration(totalDuration);
         durationElement.innerHTML = "Queue duration: " + formattedTotalDuration;

         //increments the count 
         count++;
         let countElement = document.querySelector('#movieTotal');
         countElement.innerHTML = "No. of movies in queue: " + count;

         //allows the user to remove a movie from their queue with the remove button
         removeButton.addEventListener("click", () => {
            queueContainer.removeChild(removeButton.parentElement);

            //decrements the count and the total duration 
            count--;
            countElement.innerHTML = "No. of movies in queue: " + count;

            totalDuration = totalDuration - duration;
            formattedTotalDuration = formatDuration(totalDuration);
            durationElement.innerHTML = "Queue duration: " + formattedTotalDuration;
         });

         //automatically brings the queue into view when a movie is added
         h2.scrollIntoView({behavior:"smooth"});
            
      });
      
   }

   //method to format the duration according to the specification
   function formatDuration(duration) {
      let hours = duration/60; 
      let roundedHours = Math.floor(hours);
      let minutes = (hours-roundedHours) * 60;
      let roundedMinutes = Math.floor(minutes);
      return roundedHours + ":" + roundedMinutes;
   }
})