import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Edit() {
  const [single, setSingle] = useState([]);

  let temp_id = window.location.pathname.replace("/Edit/", "");

  useEffect(() => {
    if (single.length === 0) {
      // get it by calling the api endpoint from server.js
      fetch("/api/" + temp_id)
        .then((res) => res.json())
        .then((restList) => {
          // then set it in state
          console.log(restList)
          setSingle(restList);
        });
    }
  });


    console.log(single[0])
  return (
    <div>
      <h2>This is the Edit page</h2>
          <div id="posts-container2">
            <hr />
            {/* <h3>{post.author}</h3> */}
            <form id="form-container" action={`/edit/:id`} method="POST">
              <label>
                <input name="author" type="text" value={single[0].content} />
              </label>
              <label for="start">
                Date of Post:
                <input
                  type="date"
                  id="post-date"
                  name="entry-date"
                  value={single[0].date}
                />
              </label>

              <label>
                <input
                  id="text-container"
                  name="content"
                  type="textarea"
                  value={single[0].content}
                />
              </label>
              <label>
                <input
                  id="tags-container"
                  name="tags"
                  type="input"
                  value={single[0].tags}
                />
              </label>
              <input type="submit" value="Edit" /> 
            </form>
          </div>

      {/* <button>Edit Post Data</button> */}
      <button>Delete Post</button>
    </div>
  );
}
