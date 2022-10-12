import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { env } from '../../Config'

function Home() {
  const [allData, setData] = useState([])
  const [rend, setRend] = useState(0)
  let formik = useFormik({
    initialValues: {
      urlValues:''
    },
    validate: (values) => {
      let errors = {}
if(values.urlValues===""){
  console.log("enter url")
}
      return errors;
    },
    onSubmit: async (values) => {
      try {
        let urlData = await axios.post(`${env.api}/randurl`, values, {
          headers: {
            'auth': window.localStorage.getItem('app-tok'),
            'userid': window.localStorage.getItem('obj-id')
          }
        })
        console.log(values)
        
        console.log(urlData.data)
        
        setRend(rend + 1)
          alert(urlData.data.messege)
        } catch (error) {
        console.log(error)
      }
      
    }
   
  })
  useEffect(() => {
    loadData();
   
  }, [rend])
  let loadData = async () => {
    try {
      let urlData = await axios.get(`${env.api}/allurl`, {
        headers: {
          'auth': window.localStorage.getItem('app-tok')
        }
      })

      setData(urlData.data.allUrl)

      setTimeout(() => {
        console.log(urlData.data.allUrl)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }
  let countI =()=>{
    setRend(rend + 1)
  }
  return (
    <>

      <nav className="navbar  bg-primary justify-content-center ">
        <div className="container-fluid " style={{ display: 'flex', justifyContent: "center" }}>
          <a className="navbar-brand " href="h">Url shortner</a>
        </div>
      </nav>

      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-md-6 ">
              <label htmlFor="exampleInputEmail1" className="form-label">Paste your URL down here</label>
              <input type='text' name="urlValues" onChange={formik.handleChange} value={formik.values.url} className="form-control"  />
              <div id="emailHelp" className="form-text">Enter a valid url.</div>
              <button type="submit" className="btn btn-info mt-3 mb-3">Submit</button>
            </div>
          </div>

        </div>
      </form>
      <div className="container mt-3">

        <div className="row">
          {
            allData ? (
              allData.map((val, keys) => {
                return (
                  <div className="col-md-3" key={keys}>
                    <div className="card text-bg-dark mb-3" style={{ maxWidth: "18rem" }}>
                      <div className="card-header">Total clicks: {val.totalclick}</div>
                      <div className="card-body">
                        <h5 className="card-title">Your short url: <a onClick={countI} href={`${val.divUrl}`} rel=" noreferrer" target={'_blank'}>{val.divUrl}</a></h5>
                        <p className="card-text">You will be diverted to: {val.urlValues}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : null
          }
        </div>
      </div>




    </>

  )
}

export default Home