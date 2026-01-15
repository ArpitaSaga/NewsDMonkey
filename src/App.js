import "./App.css";
import LoadingBar from "react-top-loading-bar";

import React, { useState } from "react";
import Navbar from "./component/Navbar";
import NewsSection from "./component/NewsSection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [progress, setProgress]=useState(10);
  
  let pageSize = 15; 
  let country = "us";
  let api_key = process.env.REACT_APP_API_KEY
  
  
    // console.log(api_key)
    return (
      <div>
        <Router>
          
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={progress}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <NewsSection setProgress={setProgress} api={api_key} 
                  key="general"
                  pageSize={pageSize}
                  country={country}
                  category="general"
                />
              }
            />

            <Route
              exact
              path="/business"
              element={
                <NewsSection setProgress={setProgress} api={api_key} 
                  key="business"
                  pageSize={pageSize}
                  country={country}
                  category="business"
                />
              }
            />

            <Route
              exact
              path="/entertainment"
              element={
                <NewsSection setProgress={setProgress} api={api_key} 
                  key="entertainment"
                  pageSize={pageSize}
                  country={country}
                  category="entertainment"
                />
              }
            />

            <Route
              exact
              path="/health"
              element={
                <NewsSection setProgress={setProgress} api={api_key} 
                  key="health"
                  pageSize={pageSize}
                  country={country}
                  category="health"
                />
              }
            />

            <Route
              exact
              path="/science"
              element={
                <NewsSection setProgress={setProgress} api={api_key} 
                  key="science"
                  pageSize={pageSize}
                  country={country}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sport"
              element={
                <NewsSection setProgress={setProgress} api={api_key} 
                  key="sport"
                  pageSize={pageSize}
                  country={country}
                  category="sport"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <NewsSection setProgress={setProgress} api={api_key} 
                  key="technology"
                  pageSize={pageSize}
                  country={country}
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }


export default App;
