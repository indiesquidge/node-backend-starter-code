const newSearchForm = document.querySelector('.new-search-form')
const newSearchInput = document.querySelector('#new-search-input')
const newSearchSubmit = document.querySelector('.new-search-submit')
const movieList = document.querySelector('.movie-list')
const errorMessage = document.querySelector('.error-message')

// don't allow user to submit empty searches
newSearchInput.addEventListener('keyup', () => {
  newSearchSubmit.disabled = !newSearchInput.validity.valid
})

newSearchForm.addEventListener('submit', e => {
  e.preventDefault()

  const movieTitle = newSearchInput.value

  fetch(`https://www.omdbapi.com/?s=${movieTitle}`)
    .then(response => response.json())
    .then(validateSearch)
    .then(renderMovies)
    .catch(handleError)
})

function convertToElement(movie) {
  const moviePoster = movie.Poster === 'N/A' ? './assets/default_poster.jpg' : movie.Poster
  return `<li class="movie">
            <h3 class="movie-title">${movie.Title}</h3>
            <img class="movie-poster" src="${moviePoster}" alt="movie-poster">
            <p class="movie-info movie-year">Relese Year: ${movie.Year}</p>
            <p class="movie-info movie-type">Type: ${movie.Type}</p>
            <button class="btn add-to-favorites">&#9733; Favorite</button>
          </li>`
}

function renderMovies(movies) {
  const movieElements = movies.map(convertToElement).join('')
  movieList.innerHTML = movieElements

  // IMO, this isn't super great, but basically we are looping over our movie data,
  // grabbing the list element it correlates to (which itself is bad, because
  // this assumes that the index of the movie data maps perfectly to where that
  // movie exists as an element in the DOM), and adding event listeners to each
  // movie element to toggle the info and add to favorites.
  //
  // **This is a great example of some basic difficulties of attaching handlers
  // to specific data when using vanilla JS, at least with the approach I have
  // taken.**
  movies.forEach((movie, i) => {
    const movieEl = movieList.querySelectorAll('.movie')[i]
    addEventListeners(movieEl, movie)
  })
}

function addEventListeners(el, movie) {
  el.classList.add('collapsed')
  el.addEventListener('click', toggleInfo)
  el.addEventListener('click', e => addFavorite(e, movie))
}

function toggleInfo(event) {
  if (event.target.tagName === 'H3') {
    const movieEl = event.target.parentElement
    movieEl.classList.toggle('collapsed')
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

function handleError(error) {
  errorMessage.innerHTML = error
  errorMessage.classList.toggle('active')
  setTimeout(() => {
    errorMessage.classList.toggle('active')
  }, 5000)
}

function validateSearch(responseJSON) {
  if (responseJSON.Search) return responseJSON.Search
  throw new Error(responseJSON.Error)
}
