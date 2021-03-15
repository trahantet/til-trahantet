import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Data() {
  // state for the results of the fetch
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(""); // what is selected state for dropdown

  //   if nothing is in the state, then fetch all posts...
  useEffect(() => {
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

  // when option is selected save it in selected state
  function handleChange(evt) {
    let target = evt.target;
    console.log(target);
    setSelected(target.value);
  }

  // fetch results based on filter form
  function filter(evt) {
    // selection event
    evt.preventDefault();
    // make url for fetch, with query params
    let url = `/filter?${selected}=${evt.target[0].value}`;
    fetch(url)
      .then((res) => res.json())
      .then((restList) => {
        // then set it in state
        setResults(restList);
      });
  }

  return (
    <div>
      <h1>All Posts</h1>

      <div id="posts-container">
        <select name="field-selection" value={selected} onChange={handleChange}>
          <option value=""></option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="tags">Tag</option>
          {/* <option value="date">Date</option> */}
        </select>
        {/* if a filter is selected, open modal text box for filter specification */}
        <div>Filter by: {selected}</div>
        <div className="filter">
          {selected && (
            // when something is submitted, send it tio filter function to be used in fetch
            <form id="filter-container" onSubmit={filter}>
              <label>
                <input name="filter" type="text" placeholder="Filter:" />
              </label>
              <input type="submit" value="Filter" />
            </form>
          )}
        </div>

        {/* format results to show on page */}
        {results.map((post, index) => {
          return (
            <div id="posts-container2">
              <hr />
              <h2 key={index + "-title"}>{post.title}</h2>
              <h3 key={index + "-author"}>{post.author}</h3>
              <h4 key={index + "-date"}>{post.date}</h4>
              <p key={index + "-content"}>{post.content}</p>
              <h4 key={index + "-tags"}>{post.tags + " "}</h4>
              {/* post.tags */}
              <Link id="edit-button-link" to={"/Edit/" + post._id}>
                <button id={post._id + "-edit"}>Edit/Delete Post Data</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
