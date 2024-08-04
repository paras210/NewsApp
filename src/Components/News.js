import React from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from 'react'

export default function News(props) {
  const [articles, setArticles] = useState([])
  let [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalArticles, setTotalArticles] = useState(0)

  const capitalizeTxt = (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
  }


  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalArticles(parsedData.totalResults)
    props.setProgress(100);
    setLoading(false)

  }

  useEffect(() => {
  document.title = `TrueNews - ${capitalizeTxt(props.category)}`
    updateNews()
    // eslint-disable-next-line
  }, [])


  // const handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3bc75412f40c475792d2cc684d3cd5d7&page=${page - 1}&pagesize=${props.pageSize}`;
    // this.setState({loading : true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({
    //   page:page-1,
    //   articles : parsedData.articles,
    //   loading:false
    // })
  //   setPage(page-1)
  //   updateNews();
  // }
  // const handleNextClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3bc75412f40c475792d2cc684d3cd5d7&page=${page + 1}&pagesize=${props.pageSize}`;
    // let data = await fetch(url)
    // this.setState({loading : true})
    // let parsedData = await data.json()
    // this.setState({
    //   page:page+1,
    //   articles : parsedData.articles,
    //   loading:false
    // })
  //   setPage(page+1)
  //   updateNews();
  // }
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url)
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalArticles(parsedData.totalResults)
  };

  return (
    <>
      <h1 className=' text-center' style={{marginTop :'80px' }}>TrueNews - Top Headlines from {capitalizeTxt(props.category)}</h1>
      {loading && <Loading/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Loading />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4 d-flex justify-content-center" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>

            })}
          </div>
          {/* <div className="container d-flex justify-content-between my-2 px-0">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalArticles / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
        </div >
      </InfiniteScroll>

    </>
  )
}
// News.defaultProps = {
//   pageSize: 6,
//   country: 'in',
//   category: 'general'
// }
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}