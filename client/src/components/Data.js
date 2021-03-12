import React, { useState, useEffect } from "react";

export default function Data() {
  // state for if the button is clicked.. starts as false
  const [results, setResults] = useState([]);

  //   when something happens to clicked state.. activate this useEffect
  useEffect(() => {
    //   if the button is clicked (aka clicked state === true)
    if (results.length === 0) {
      // get it by calling the api endpoint from server.js
      fetch("/api")
        .then((res) => res.json())
        .then((restList) => {
          // then set it in state
          setResults(restList);
        });
    }
  });

  
  console.log(results);
  return (
    <div>
      <h1>All Posts</h1>

      {/*printing unformatted results to page.. this way is dependent on  JSON.stringify from above */}
      {/* <div>{answer}</div> */}

      {/* use map to return each chat as an individual div containing text */}
      <div id="posts-container">
      {results.map((post, index) => {
        return (
          <div id="posts-container2">
            <div key={index + "-author"}>{post.author}</div>
            <div key={index + "-date"}>{post.date}</div>
            <div key={index + "-content"}>{post.content}</div>
            <div key={index + "-tags"}>{post.tags}</div>
          </div>
        );
        
      })}
      </div>
    </div>
  );
}
