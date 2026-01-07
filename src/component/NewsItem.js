import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, desc, imageUrl, newsURL, author, date, source } = this.props;
    return (
      <div>
        <div className="card m-2">
          {/* <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger"> */}
          <div className="position-absolute top-0 " style={{right:"0%", zIndex: '1'}}>
          <span className=" badge rounded-pill top-0 bg-danger mt-0 " >
            {source}
            
          </span>
          </div>
          <img
            src={imageUrl}
            className="card-img-top"
            height="190px"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>

            <p className="card-text">{desc}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <div className="text-center">
            <a
              href={newsURL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark "
            >
              Read more
            </a></div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
