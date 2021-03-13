import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
         <div id="navBar-container">
      <Link id="navBar-links" to={"/"}>
        Home
      </Link>
      <Link id="navBar-links" to={"/Data"}>
        Data
      </Link>
      {/* <Link id="navBar-links" to={"/Edit"}>
        Edit
      </Link> */}
    </div>
    )
}
