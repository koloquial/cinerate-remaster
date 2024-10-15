import { movieList } from "../data/randomMovieList";
export function getRandomMovie() {
    let random = Math.floor(Math.random() * movieList.length);
    console.log('random', random);
    return movieList[random];
  };
  