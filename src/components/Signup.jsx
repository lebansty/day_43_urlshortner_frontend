import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import  { useState } from 'react';
import Mdl from './Mdl';
import { env } from '../Config';

function Signup() {
    const [show, setShow] = useState(false);
const [msg,setMsg] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let formik = useFormik({
        initialValues: {
            firstName:'',
            lastName:'',
            email: '',
            password: ''
        },
        validate: (values) => {
            let errors = {}
            if (values.email === '') {
                errors.email = "Enter email address"
            }
            if(values.password === ''){
                errors.password ='Enter the password'
            }
            return errors
        },
        onSubmit: async (values) => {
        try {
           let response= await axios.post(`${env.api}/userpost`,values)
            setMsg(response.data.messege)
            handleShow()
              console.log(response)
        } catch (error) {
            console.log(error)
        }
        }
    })
  return (
  <>
  
    <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 col-sm-6  signup">
            <form onSubmit={formik.handleSubmit}>
           <div className="row">
            <div className="col-6">
            <div class="mb-3">
                    <label htmlFor="exampleInputFirst1" className="form-label">First name</label>
                    <input type="name" name='firstName'value={formik.values.firstName} onChange={formik.handleChange} class="form-control" id="exampleInputFirst1"  />
                    
                </div>
            </div>
            <div className="col-6">
            <div class="mb-3">
                    <label htmlFor="exampleInputSecond1" className="form-label">Last name</label>
                    <input type="name" name='lastName'value={formik.values.lastName} onChange={formik.handleChange} class="form-control" id="exampleInputSecond1"/>
                    
                </div>
            </div>
           </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email your email (Username)</label>
                    <input type="email" name='email'value={formik.values.email} onChange={formik.handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">Enter a valid email id.</div>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1" class="form-label">Create a password </label>
                    <input name="password" value={formik.values.password} onChange={formik.handleChange} type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                
                <div className='bton'>
                    <button type="submit" style={{ backgroundColor: "dodgerblue", border: 'none' }} class="btn btn-primary mt-4">Signup</button>
                </div>

            </form>
            <div className="signuplnk mt-5">
                <p>Already have an account?&nbsp;<Link to={'/'} className="decor">Login</Link></p>
            </div>
        </div>
            {/* <!-- Button trigger modal --> */}

    </div>

   
</div>
<Mdl mdlShow={show} msg={msg} triggerClose={handleClose} ></Mdl>
  </>
  )
}

export default Signup