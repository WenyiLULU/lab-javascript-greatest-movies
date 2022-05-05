// The `movies` array from the file `src/data.js`.
//console.log('movies: ', movies);

// const movies = require('./data');


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(movie => movie.director);
}
function unifiedAllDirectors(moviesArray) {
  return Array.from(new Set(moviesArray.map(movie => movie.director)));
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(movie => movie.director === "Steven Spielberg" && movie.genre.includes("Drama")).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if(moviesArray.length === 0){
    return 0;
  } else {
    return +(moviesArray
      .filter(movie => movie.score)
      .reduce((total, movie) => total + movie.score, 0)/moviesArray.length).toFixed(2)}
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  return scoresAverage(moviesArray.filter(movie => movie.genre.includes("Drama")))
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const moviesToOrder = [...moviesArray];
  return moviesToOrder.sort((m1, m2) => {
    if (m1.year < m2.year) return -1;
    if (m1.year > m2.year) return 1;
    if (m1.year === m2.year) {
      if (m1.title < m2.title) return -1;
      if (m1.title > m2.title) return 1;
      if (m1.title === m2.title) return 0;
    };
  })
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const moviesToOrder = moviesArray;
  return moviesToOrder
    .map (movie => movie.title)
    .sort((m1, m2) => {
    if (m1 < m2) return -1;
    if (m1 > m2) return 1;
    if (m1 === m2) return 0;
  }) 
    .slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function trunToMinutes(duration){
  if(duration.length > 2){
    return parseInt(duration[0])*60 + parseInt(duration.slice(3, 5));
  } else {
    return parseInt(duration[0])*60;
  }
}
function turnHoursToMinutes(moviesArray) {
  const turnedMovies = JSON.parse(JSON.stringify(moviesArray));
  for (let i = 0; i < turnedMovies.length; i+=1){
    turnedMovies[i].duration = trunToMinutes(turnedMovies[i].duration)
  }
  return turnedMovies;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null
  } else {
    const yearsOfMovies = Array.from(new Set(moviesArray.map(movie => movie.year)));
    let bestScore = 0;
    let bestYear = 0;
    yearsOfMovies.forEach(year => {
      let score = scoresAverage(moviesArray.filter(movie => movie.year === year));
      if (score > bestScore) {
        bestScore = score;
        bestYear = year;
      } else if (score === bestScore && year < bestYear) {
        bestYear = year;
      };
    });
    return `The best year was ${bestYear} with an average score of ${bestScore}`
  }

}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
