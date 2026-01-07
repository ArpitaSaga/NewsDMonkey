import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export class NewsSection extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
    pageSize: 9,
    // api:process.env.REACT_APP_API_KEY
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      totalResult: 0,
      articles: [],
      loading: true,
      page: 1,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsDMonkey`;
  }
  capitalize = (text) => { 
    if (text.length > 0) {
      let newText = text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return newText;
    }
  };
  async updateNews(pageNo) {
    // this.props.setProgress(20)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${pageNo}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(50)
    let parsedData = await data.json();
    this.props.setProgress(90)
    this.setState({
      page: pageNo,
      totalResult: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
    });
    this.props.setProgress(100)
  }
  async componentDidMount() {
    this.updateNews(this.state.page);
  }
  handlePrevClick = async () => {
    this.updateNews(this.state.page - 1);
  };

  handleNextClick = async () => {
    this.updateNews(this.state.page + 1);
  };
  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState((prevState) => {
      const existingUrls = new Set(
        prevState.articles.map(article => article.url)
      );

      const newArticles = parsedData.articles.filter(
        article => article.url && !existingUrls.has(article.url)
      );

      return {
        page: nextPage,
        articles: prevState.articles.concat(newArticles),
        totalResult: parsedData.totalResults
      };
    });
  };

    // console.log(this.state.articles.length, this.state.totalResult)
  

  render() {
    return (
      <div className="my-3">
        <h1 className="text-center" style={{marginTop: 70 + 'px'}}>News - Top {this.capitalize(this.props.category)} headings</h1>
        {/* <Spinner/> */}
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={this.state.page < Math.ceil(this.state.totalResult / this.props.pageSize)}
          loader={<Spinner/>}
        >
          <div className="container my-3 ">
            <div className="row justify-content-center">
              {this.state.articles.map((element) => {
                  if (element.title !== null && element.description !== null) {
                    return (
                      <div className="col-md-4 d-flex justify-content-center" key={`${element.url}_${element.publishedAt}_${element.source?.name}`}>
                        <NewsItem
                          title={element.title.slice(0, 40)}
                          desc={element.description.slice(0, 88)}
                          imageUrl={
                            element.urlToImage
                              ? element.urlToImage
                              : "https://share.google/peRDpemcJckMDF5wJ"
                          }
                          newsURL={element.url}
                          author={element.author}
                          date={element.publishedAt}
                          source={element.source.name}
                        />
                      </div>
                    );
                  }
                  else{
                    return (<></>)
                  }
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around my-5">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-lg btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResult / this.props.pageSize)
            }
            className="btn btn-lg btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default NewsSection;
