import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { env } from '../Config'

function Login() {
let navi = useNavigate()
    let formik = useFormik({
        initialValues: {
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
        onSubmit:async (values) => {
            try {
              let check=  await axios.post(`${env.api}/loginc`,values)
              console.log(check)
              if(check.data.code){
                window.localStorage.setItem('obj-id',check.data.code)
                window.localStorage.setItem('app-tok',check.data.token)
navi('/home')
              }else{
                console.log("invalid input")
              }
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 col-sm-6  login">
                    <form onSubmit={formik.handleSubmit}>
                        <div class="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" name='email'value={formik.values.email} onChange={formik.handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">Enter your registered email id.</div>
                        </div>
                        <div class="mb-3">
                            <label htmlFor="exampleInputPassword1" class="form-label">Password</label>
                            <input name="password" value={formik.values.password} onChange={formik.handleChange} type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div>
                            <Link style={{ paddingTop: '32px' }} to={'/forgotpass'}>Forgot password</Link>
                        </div>
                        <div className='bton'>
                            <button type="submit" style={{ backgroundColor: "dodgerblue", border: 'none' }} class="btn btn-primary mt-4">Login</button>
                        </div>

                    </form>
                    <div className="signuplnk mt-5">
                        <p>Doesn't have an account?&nbsp;<Link to={'/signup'}>Signup now</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login