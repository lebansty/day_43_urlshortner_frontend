import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { env } from './Config'

function Passreset() {
    let navi =useNavigate()
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("passveri")
   
  const [stCode,setStcode] = useState({})
    
   
    
    useEffect(()=>{
      loadData()
    },[])
  
  let loadData = async ()=>{
    
  try {
    let verifiction = await axios.get(`${env.api}/token/passwordchange`,{
    headers:{
  'authorization':token
    }
   
  })
  
    setStcode(verifiction.data.token_id)
   
  } catch (error) {
    console.log(error);
    setStcode(error.response.status)
  }
  }
  
  
      let formik =useFormik({
          initialValues:{
            password:""
           
          },
          validate:(values)=>{
      let errors={};
      if(values.password === ""){
        errors.password = "Enter password";
      }
      
        return errors;
      
      
          },
          onSubmit: async (values)=>{
      try {
        console.log(values)
    await axios.put(`${env.api}/update`,values,{
      headers:{
        'authorization':token
      }
    })
    alert("Password updated")
    navi("/")
    
      } catch (error) {
        console.log(error)
      }
          }
          
        })
  console.log(stCode,"its me")
  return (
  <>
  
<div className='container mt-5' style={{textAlign:"left"}}>
<div className='row  justify-content-center'>
{ 
stCode === token ? (
    <div className="col-md-6 col-lg-4 col-sm-6   login">Reset your password
    <form className='mt-5' onSubmit={formik.handleSubmit}>
        <div class="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">New password</label>
            <input type="password" name='password'value={formik.values.password} onChange={formik.handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            
        </div>
     
        <div className='bton'>
            <button type="submit" style={{ backgroundColor: "dodgerblue", border: 'none' }} class="btn btn-primary mt-4">Submit</button>
        </div>

    </form>
  
</div>
):null
}
</div>

</div>
  </>
  )
}

export default Passreset