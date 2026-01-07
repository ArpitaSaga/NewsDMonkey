import "./App.css";
import LoadingBar from "react-top-loading-bar";

import React, { Component } from "react";
import Navbar from "./component/Navbar";
import NewsSection from "./component/NewsSection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  state={
    progress: 10
  }
  setProgress = (prog) => {
    this.setState({
      progress: prog
    })
  }
  pageSize = 15;
  country = "us";
  api_key = process.env.REACT_APP_API_KEY
  
  render() {
    // console.log(this.api_key)
    return (
      <div>
        <Router>
          
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <NewsSection setProgress={this.setProgress} api={this.api_key} 
                  key="general"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="general"
                />
              }
            />

            <Route
              exact
              path="/business"
              element={
                <NewsSection setProgress={this.setProgress} api={this.api_key} 
                  key="business"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="business"
                />
              }
            />

            <Route
              exact
              path="/entertainment"
              element={
                <NewsSection setProgress={this.setProgress} api={this.api_key} 
                  key="entertainment"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="entertainment"
                />
              }
            />

            <Route
              exact
              path="/health"
              element={
                <NewsSection setProgress={this.setProgress} api={this.api_key} 
                  key="health"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="health"
                />
              }
            />

            <Route
              exact
              path="/science"
              element={
                <NewsSection setProgress={this.setProgress} api={this.api_key} 
                  key="science"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sport"
              element={
                <NewsSection setProgress={this.setProgress} api={this.api_key} 
                  key="sport"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="sport"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <NewsSection setProgress={this.setProgress} api={this.api_key} 
                  key="technology"
                  pageSize={this.pageSize}
                  country={this.country}
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
