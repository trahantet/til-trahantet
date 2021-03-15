import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Data() {
  // state for if the button is clicked.. starts as false
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(""); // what is selected state

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
  // when option is selected save it in selected state
  function handleChange(evt) {
    let target = evt.target;
    setSelected(target.value);
  }

  console.log(results);
  return (
    <div>
      <h1>All Posts</h1>

      <div id="posts-container">
        <select name="field-selection" value={selected} onChange={handleChange}>
          <option value=""></option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="tag">Tag</option>
          {/* <option value="date">Date</option> */}
        </select>
        <div>Filter by: {selected}</div>

        <div className="filter">
          {selected && (
            <form id="filter-container">
              <label>
                <input name="filter" type="text" placeholder="Filter:" />
              </label>
            </form>
          )}
        </div>

        {results.map((post, index) => {
          return (
            <div id="posts-container2">
              <hr />
              <h2 key={index + "-title"}>{post.title}</h2>
              <h3 key={index + "-author"}>{post.author}</h3>
              <h4 key={index + "-date"}>{post.date}</h4>
              <p key={index + "-content"}>{post.content}</p>
              <h4 key={index + "-tags"}>{post.tags}</h4>
              <Link id="edit-button-link" to={"/Edit/" + post._id}>
                <button id={post._id + "-edit"}>Edit/Delete Book Data</button>
              </Link>
            </div>
          );
        })}
      </div>

      {console.log()}
    </div>
  );
}
