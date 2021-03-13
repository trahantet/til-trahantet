import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
              <hr />
              <h3 key={index + "-author"}>{post.author}</h3>
              <h4 key={index + "-date"}>{post.date}</h4>
              <p key={index + "-content"}>{post.content}</p>
              <h4 key={index + "-tags"}>{post.tags}</h4>
              <Link id="edit-button-link" to={"/Edit/"+ post._id}>
                <button id={post._id + "-edit"}>
                  Edit/Delete Book Data
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      {console.log()}
    </div>
  );
}
