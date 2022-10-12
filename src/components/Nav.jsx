import React from 'react'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
function nav() {
  return (
    <>
    <div className="container-fluid navDes">
<h3>URL Shortner</h3>

    </div>
    <Outlet/>
    </>
  )
}

export default nav