import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { env } from '../Config'

function Activpage() {
const [msg,setMsg] =useState('Your account is activated')
  const queryParams = new URLSearchParams(window.location.search)
  const token = queryParams.get('code')


let loadData =async()=>{
try {
 let msgDis= await axios.get(`${env.api}/token-verifi`,{
headers:{
  'auth':token
}

})
setMsg(msgDis.data.messege)

} catch (error) {
  console.log(error)
}
}
useEffect(()=>{
loadData()
},[])

  return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6 acti">
                <div>{msg}</div>
                <div className='mt-5' ><Link style={{float:'left'}} to={'/'}>Login</Link></div>
            </div>
        </div>
    </div>
  )
}

export default Activpage