import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* go through each item in names list and make them into a link, directing to their info */}
      <h3>Home Page</h3>
      <form id="form-container" action="/add" method="POST">
        <label>
          <input name="author" type="text" placeholder="Author:" />
        </label>
        <label for="start">
        Date of Post:
          <input
            type="date"
            id="post-date"
            name="entry-date"
            value="2018-07-22"
          />
        </label>

        <label>
            <input id= "text-container"name="content" type="textarea" placeholder="Today I learned...."/> 
        </label>
        <label>
            <input id= "tags-container"name="tags" type="input" placeholder="tags"/> 
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
