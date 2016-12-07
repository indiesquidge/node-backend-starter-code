const favoritesList = document.querySelector('.favorites')

document.addEventListener('DOMContentLoaded', () => {
  // remember that we are saving favorites as an object, not an array, with the
  // keys as each movie's unique ID. This is avoid duplication of movies in our
  // favorites list, which could happen pretty easily with just an array if a
  // user clicked "favorite" multiple times on the same movie.
  fetch('/favorites.json')
    .then(response => response.json())
    .then(json => Object.keys(json).map(movieKey => json[movieKey]))
    .then(renderFavorites)
})

function renderFavorites(movies) {
  const movieElements = movies.map(convertToElement).join('')
  favoritesList.innerHTML = movieElements
}

function convertToElement(movie) {
  return `<li class="movie">
            <h3>${movie.Title}</h3>
            <p><img src="${movie.Poster}" alt="movie-poster"></p>
            <p>${movie.Type}</p>
            <p>${movie.Year}</p>
          </li>`
}
