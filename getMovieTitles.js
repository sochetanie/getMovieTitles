function getMovieTitles(substr) {
    let page = 1
    let URL = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=`
    let urls = []
    let numOfPages = 0
    
    fetch(URL+page)
    .then(res=>res.json())
    .then(function(data) {
        numOfPages = data.total_pages
        for (let i=1; i<=numOfPages; i++ ){
            urls.push(URL+i)
        }
        
        Promise.all(urls.map(x=>fetch(x)
          .then(res=>res.json()) ))
          .then(resp=>{
            let data = resp.map(resp=>resp.data)

            let titelsArr = []
            data.forEach(x=>{ x.forEach(x=>titelsArr.push(x.Title)) })
            
            titelsArr.sort()
            console.log(titelsArr)
        })
    })
}
getMovieTitles("spiderman")