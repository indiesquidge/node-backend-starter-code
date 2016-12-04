const newSearchForm = document.querySelector('.new-search-form')
const newSearchInput = document.querySelector('#new-search-input')
const newSearchSubmit = document.querySelector('.new-search-submit')
const movieList = document.querySelector('.movie-list')

newSearchInput.addEventListener('keyup', () => {
  newSearchSubmit.disabled = !newSearchInput.validity.valid
})

newSearchForm.addEventListener('submit', e => {
  e.preventDefault()

  const movieTitle = newSearchInput.value

  fetch(`http://www.omdbapi.com/?s=${movieTitle}`)
    .then(response => response.json())
    .then(json => json.Search)
    .then(renderMovies)
})

function convertToElement(movie) {
  return `<li class="movie"><h3>${movie.Title}</h3></li>`
}

function renderMovies(movies) {
  const movieElements = movies.map(convertToElement).join('')
  movieList.innerHTML = movieElements
}
