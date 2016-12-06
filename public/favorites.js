const favoritesList = document.querySelector('.favorites')

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/favorites.json')
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
