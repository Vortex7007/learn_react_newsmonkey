import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 6,
    category : 'general'
  }
  
  static propTypes = {
    country : PropTypes.string,
    pagesize : PropTypes.number,
    category : PropTypes.string,
  }
  
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=374134b7018b4b05ba210f08b309cb4d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data =await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles: parsedData.articles , 
      totalResults : parsedData.totalResults,
      loading : false
    })
  }

   handlePreviousClick = async() =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=374134b7018b4b05ba210f08b309cb4d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data =await fetch(url);
    let parsedData = await data.json()
    this.setState({
      page : this.state.page -1,
      articles: parsedData.articles,
      loading : false
    })
  }
   handleNextClick = async() =>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=374134b7018b4b05ba210f08b309cb4d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data =await fetch(url);
    let parsedData = await data.json()
    this.setState({
      page : this.state.page +1,
      articles: parsedData.articles,
      loading : false
    })
  }
  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem title ={element.title?element.title:"No title"} description={element.description?element.description:"No description"} imageUrl={element.urlToImage} newsUrl={element.url}/>
      </div>
        })}
            
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark my-3" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
