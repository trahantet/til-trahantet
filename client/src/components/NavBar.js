import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
         <div id="navBar-container">
      <Link id="navBar-links" to={"/"} style= {{textDecoration: "none", fontSize: "20px"}}>
        Home
      </Link>
      <Link id="navBar-links" to={"/Data"} style= {{textDecoration: "none", fontSize: "20px"}}>
        Data
      </Link>
      {/* <Link id="navBar-links" to={"/Edit"}>
        Edit
      </Link> */}
    </div>
    )
}
