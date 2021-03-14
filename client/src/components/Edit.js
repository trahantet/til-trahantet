import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Edit() {
  const [single, setSingle] = useState({
    author: "",
    date: "",
    content: "",
    tags: [],
    _id: "",
  });
  const [temp, setTemp] = useState("");

  let temp_id = window.location.pathname.replace("/Edit/", "");

  useEffect(() => {
    if (single.author === "") {
      // get it by calling the api endpoint from server.js
      fetch("/api/" + temp_id)
        .then((res) => res.json())
        .then((restList) => {
          // then set it in state
          setSingle({
            author: restList[0],
            date: restList[2],
            content: restList[1],
            tags: restList[3],
            _id: restList[4],
          });
        });
    }
  });

  // trying to update tags list

  //  function changeTags(e){
  //    let newTag= e.target.value
  //    if(newTag){
  //    setTemp(temp+newTag)}
  //    let tagArr = single.tags
  //    console.log(temp)
  //    if(newTag === ","){
  //     tagArr.push(temp)
  //     console.log(tagArr)
  //     setSingle({tags:tagArr})
  //    }
  //  }

  return (
    <div>
      <h2>This is the Edit page</h2>
      <div id="posts-container2">
        <hr />
        <h3>{single.author}</h3>
        <form id="form-container" action={`/edit/:id`} method="POST">
          <label>
            <input
              name="author"
              type="text"
              value={single.author} // why does it refresh?
              onChange={(e) => setSingle({ author: e.target.value})}
            />
          </label>
          {/* <label for="start">
            Date of Post:
            <input
              type="date"
              id="post-date"
              name="entry-date"
              value={single.date}
              onChange={e => setSingle({date:e.target.value})}
            />
          </label> */}

          <label>
            <textarea
              id="text-container"
              name="content"
              type="textarea"
              value={single.content}
              onChange={(e) => setSingle({ content: e.target.value })}
            />
          </label>
          {/* <label>
            <input
              id="tags-container"
              name="tags"
              type="input"
              value={single.tags}
              onChange={changeTags}
            />
          </label> */}
          <input type="submit" value="Edit" />
        </form>
      </div>

      {/* <button>Edit Post Data</button> */}
      <button>Delete Post</button>
    </div>
  );
}
