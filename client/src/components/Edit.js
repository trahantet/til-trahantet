import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Edit() {
  const [single, setSingle] = useState([]);

  let temp_id = window.location.pathname.replace("/Edit/", "");
  console.log(temp_id);

  useEffect(() => {
    if (single.length === 0) {
      // get it by calling the api endpoint from server.js
      fetch("/api/" + temp_id)
        .then((res) => res.json())
        .then((restList) => {
          // then set it in state
          setSingle(restList);
        });
    }
  });

  function updateTags(e){
    let tagsArr = []
    let tempTags = single.tags

  }

  return (
    <div>
      <h2>This is the Edit page</h2>

      <div id="posts-container2">
        <hr />
        <form id="form-container" onSubmit={updateTags} action={`/edit/${temp_id}`} method="POST">
          <label>
            <h3>{single.title}</h3>
            <input
              name="title"
              type="text"
              value={single.title} // why does it refresh?
              onChange={(e) => setSingle({ title: e.target.value })}
            />
          </label>
          <label>
            Author:
            <input
              name="author"
              type="text"
              value={single.author} // why does it refresh?
              onChange={(e) => setSingle({ author: e.target.value})}
            />
          </label>
          <label>
            Date of Post:
            <input
              type="text"
              id="post-date"
              name="entry-date"
              value={single.date}
              //   onChange={e => setSingle({date:e.target.value})}
            />
          </label>

          <label>
            <textarea
              id="text-container"
              name="content"
              type="textarea"
              value={single.content}
              onChange={(e) => setSingle({ content: e.target.value })}
            />
          </label>
          <label>
            Tags:
            <input
              id="tags-container"
              name="tags"
              type="input"
              value={single.tags}
              onChange={(e) => setSingle({ tags: e.target.value.split(',') })}
            />
          </label>
          <input type="submit" value="Edit" style={{ width: "500px" }} />
        </form>
      </div>

      {/* <button>Edit Post Data</button> */}
      <Link id="edit-button-link" to={"/Data/"}>
        <button
          style={{ width: "500px" }}
          onClick={() => {
            fetch("/delete/" + temp_id);
          }}
        >
          Delete Post
        </button>
      </Link>
      <Link id="edit-button-link" to={"/Data/"}>
        <button style={{ width: "500px" }}>Cancel</button>
      </Link>
    </div>
  );
}
