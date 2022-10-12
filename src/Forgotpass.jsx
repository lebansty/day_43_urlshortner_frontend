import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Mdl from './components/Mdl';
import { env } from './Config';

function Forgotpass() {
  const [show, setShow] = useState(false);
  const [msg,setMsg] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let formik = useFormik({
    initialValues: {
        email: '',
       
    },
    validate: (values) => {
        let errors = {}
        if (values.email === '') {
            errors.email = "Enter email address"
        }
      
        return errors
    },
    onSubmit:async (values) => {
        try {
          let check=  await axios.post(`${env.api}/passchange-mailverify`,values)
          console.log(check)
          setMsg(check.data.messege)
            handleShow()
        
        } catch (error) {
            console.log(error)
        }
    }
})
  return (
    <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 col-sm-6   login">
            <form className='mt-5' onSubmit={formik.handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name='email'value={formik.values.email} onChange={formik.handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">Enter your registered email id.</div>
                </div>
                <div className="signuplnk mt-5">
                <Link to={'/'} className="decor">Login</Link>
            </div>
                <div className='bton'>
                    <button type="submit" style={{ backgroundColor: "dodgerblue", border: 'none' }} class="btn btn-primary mt-4">Verify</button>
                </div>

            </form>
          
        </div>
    </div>
    <Mdl mdlShow={show} msg={msg} triggerClose={handleClose}></Mdl>
</div>
  )
}

export default Forgotpass