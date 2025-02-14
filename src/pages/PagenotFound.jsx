import React from 'react'
import { Link } from 'react-router-dom'


function PagenotFound() {
  return (
    <>
     <div className="container p-5">
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex align-items-center flex-column">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/03ed9b172565177.64a53c6c10285.gif" alt="page not found" className='w-50' style={{height:'400px'}} />
                <h4>The Page you are looking is unavailable</h4>
                <Link to={'/'}><button className='btn btn-success rounded mt-2'>GO HOME</button></Link>
            </div>
            <div className="col-md-2"></div>
        </div>
    </div>
    </>
  )
}

export default PagenotFound