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
  return `<li class="movie" style="overflow: hidden; height: 22px;">
            <h3 style="margin: 0;">${movie.Title}</h3>
            <p><img src="${movie.Poster}" alt="movie-poster"></p>
            <p>${movie.Type}</p>
            <p>${movie.Year}</p>
            <button class="add-to-favorites">Favorite</button>
          </li>`
}

function renderMovies(movies) {
  const movieElements = movies.map(convertToElement).join('')
  movieList.innerHTML = movieElements
  movies.forEach((movie, i) => {
    const movieEl = movieList.querySelectorAll('.movie')[i]
    addToggleInfoEventListener(movieEl, movie)
  })
}

function addToggleInfoEventListener(el, movie) {
  el.addEventListener('click', toggleInfo)
  el.addEventListener('click', e => addFavorite(e, movie))
}

function toggleInfo(event) {
  if (event.target.tagName === 'H3') {
    const movieEl = event.target.parentElement
    const currHeight = movieEl.clientHeight
    movieEl.style.height = (currHeight === 22 ? 630 : 22) + 'px'
  }
}

function addFavorite(event, movie) {
  const addToFavoritesButton =
    event.target.parentElement.querySelector('button.add-to-favorites')

  addToFavoritesButton.addEventListener('click', () => {
    fetch('/favorites.json', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    })
  })
}
