import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsSection = (props) => {
  const [item, setItem] = useState({
      totalResult: 0,
      articles: [],
      loading: true,
      page: 1,
  })
  
  const capitalize = (text) => { 
    if (text.length > 0) {
      let newText = text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return newText;
    }
  };
  const updateNews = async (pageNo) => {
    // props.setProgress(20)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${pageNo}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(50)
    let parsedData = await data.json();
    props.setProgress(90)
    setItem({
      page: pageNo,
      totalResult: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false,
    });
    props.setProgress(100)
  }

  useEffect(()=>{
    document.title = `${capitalize(props.category)} - NewsDMonkey`;
    updateNews(item.page);
    // eslint-disable-next-line
  }, [])
  
  const fetchMoreData = async () => {
    const nextPage = item.page + 1;

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${nextPage}&pageSize=${props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    setItem((prevState) => {
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

    // console.log(item.articles.length, item.totalResult)
  

  
    return (
      <div className="my-3">
        <h1 className="text-center" style={{marginTop: 70 + 'px'}}>News - Top {capitalize(props.category)} headings</h1>
        {/* <Spinner/> */}
        {item.loading && <Spinner />}
        <InfiniteScroll
          dataLength={item.articles.length}
          next={fetchMoreData}
          // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={item.page < Math.ceil(item.totalResult / props.pageSize)}
          loader={<Spinner/>}
        >
          <div className="container my-3 ">
            <div className="row justify-content-center">
              {item.articles.map((element) => {
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
            disabled={item.page <= 1}
            className="btn btn-lg btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            disabled={
              item.page >=
              Math.ceil(item.totalResult / props.pageSize)
            }
            className="btn btn-lg btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }


NewsSection.defaultProps = {
    country: "us",
    category: "general",
    pageSize: 9,
    // api:process.env.REACT_APP_API_KEY
  };
NewsSection.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

export default NewsSection;
