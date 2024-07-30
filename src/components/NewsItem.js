import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
      let {title , description, imageUrl, newsUrl}= this.props;
    return (
      <div className="card my-2">
        <img src={imageUrl?imageUrl:"https://www.livemint.com/lm-img/img/2024/07/16/1600x900/INDIA-REGULATION-DERIVATIVES-0_1719248136537_1721135837719.JPG"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Details</a>
        </div>
      </div>
    )
  }
}

export default NewsItem
