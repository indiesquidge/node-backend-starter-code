# OMDb Favorites

Application making use of the OMDb API to search and favorite movies.

Production site: https://omdb-favorites.herokuapp.com/

---

1. Search for movies
2. Choose your favorites
3. Keep a running list of the films you appreciate most!

![app-image](http://i.imgur.com/QJSvQS9.png)

### Running Locally

```
git clone git@github.com:indiesquidge/omdb-favorites.git
cd omdb-favorites
npm install
npm start
```

Head over to [localhost:3000](http://localhost:3000/) to see the app!

### Future Features

- Ability to unfavorite a movie

- API testing

- Writing to a JSON file to store our information is hardly a working solution
    to mimic a database. First of all, it means that the list of favorites is
    shared across everyone using the app (there are ways around this with
    authentication), and secondly, it makes the API endpoints more difficult to
    test. We would be better off just storing the user's list of favorites as a
    `localStorage` key for this simple of an app.

- OMDb only shows the first 10 results for any search, despite the fact that
    many hundreds of movies may have matched. They actually return the number of
    matches there really were in the response object under the `totalResults`
    key. You can see the next page (e.g. results 11-20) by including the `page`
    query parameter (`curl "https://www.omdbapi.com/?s='star wars'&page=2"`). It would
    be nice to include "prev" and "next" buttons at the bottom of the results in
    order for the user to page through all matching movies
