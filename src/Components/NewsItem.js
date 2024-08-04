import React from 'react'

export default function NewsItem (props) {
    let { title, description, imageurl, newsUrl, author, date ,source} = props;
    return (
      <div>
        <div className="card my-3 " >
          <div style={{display:'flex' , justifyContent:'flex-end' ,position:'absolute' , right: '0'}}>
            <span className="badge rounded-pill bg-danger" style={{left:'50%' , zIndex:'1'}}>
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <img src={imageurl ? imageurl : "https://qph.cf2.quoracdn.net/main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq"} className="card-img-top" alt="..." />
          <div className="card-body ">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By{author} on {new Date(date).toUTCString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
}
