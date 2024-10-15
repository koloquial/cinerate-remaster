import { movieList } from "../data/randomMovieList";

let shuffledMovies = [...movieList]; // Create a copy of the movie list
let currentIndex = 0; // To keep track of the current index
const pickedMovies = new Set(); // To keep track of picked movies

// Function to shuffle the movies array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
};

// Shuffle the movie list once at the beginning
shuffledMovies = shuffleArray(shuffledMovies);

export function getRandomMovie() {
    // Check if all movies have been picked
    if (pickedMovies.size === movieList.length) {
        // Reset the picked movies and shuffle the list again
        pickedMovies.clear();
        shuffledMovies = shuffleArray(movieList);
        currentIndex = 0; // Reset index
    }

    let movie;
    // Loop to find a movie that hasn't been picked
    do {
        movie = shuffledMovies[currentIndex];
        currentIndex++;
        // If we reached the end of the shuffled list, wrap around to the beginning
        if (currentIndex >= shuffledMovies.length) {
            currentIndex = 0;
        }
    } while (pickedMovies.has(movie)); // Ensure the movie hasn't been picked

    pickedMovies.add(movie); // Add the movie to the picked list
    return movie; // Return the selected movie
}
