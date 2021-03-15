import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* form to add new post */}
      <form id="form-container" action="/add" method="POST">
        <label>
          <input name="title" type="text" placeholder="Title:" />
        </label>
        <label>
          <input name="author" type="text" placeholder="Author:" />
        </label>
        {/* took my date out because I manually put that in in the backend */}
        {/* <label for="start">
        Date of Post:
          <input
            type="date"
            id="post-date"
            name="entry-date"
            value="2018-07-22"
          />
        </label> */}
        <label>
          <input
            id="text-container"
            name="content"
            type="textarea"
            placeholder="Today I learned...."
          />
        </label>
        <label>
          <input
            id="tags-container"
            name="tags"
            type="input"
            placeholder="tags"
          />
        </label>
        <input type="submit" style={{ width: "400px" }}/>
      </form>
    </div>
  );
}
