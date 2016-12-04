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
          </li>`
}

function renderMovies(movies) {
  const movieElements = movies.map(convertToElement).join('')
  movieList.innerHTML = movieElements
  addToggleInfoEventListener()
}

function addToggleInfoEventListener() {
  const movieElements = document.querySelectorAll('.movie')
  movieElements.forEach(el =>
    el.addEventListener('click', (e) => toggleInfo(e))
  )
}

function toggleInfo(event) {
  if (event.target.tagName === 'H3') {
    const movieEl = event.target.parentElement
    const currHeight = movieEl.clientHeight
    movieEl.style.height = (currHeight === 22 ? 584 : 22) + 'px'
  }
}
