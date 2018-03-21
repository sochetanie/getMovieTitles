function getMovieTitles(substr) {
    let currentPage = 1
    let URL = "https://jsonmock.hackerrank.com/api/movies/search/?Title="+substr+"&page="
    let urls = []
    let totalPages = 0

    fetch(URL+currentPage)
    .then(res=>res.json())
    .then(function(data) {
        totalPages = data.total_pages
        for (let i=1 ; i<=totalPages; i++ ){
            urls.push(URL+i)
        }

        Promise.all(urls.map(url=>fetch(url)
          .then(resp => resp.json()) ))
          .then(resp => {
            let data = resp.map(resp => resp.data )
            let movieTitles = [].concat.apply([],data).map(movie => movie.Title)
            movieTitles.sort()
            console.log(movieTitles)
        })
    })
}

getMovieTitles("spiderman")