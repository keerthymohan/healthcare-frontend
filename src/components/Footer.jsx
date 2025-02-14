import React from 'react'

function Footer() {
  return (
    <>
       <div className='mt-5'>
        <div className='container-fluid bg-secondary p-5 rounded'>
          <div className="row">
            <div className="col-md-4">
            <h4 className='text-primary me-3 fw-bold'> HelloHealth</h4> 
            <p className='mt-3' style={{textAlign:'justify'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, eos fuga! Debitis, molestias. Ipsa voluptates quasi architecto alias impedit dolorum dignissimos, deserunt unde commodi laudantium perspiciatis possimus a aperiam assumenda!</p>
    
            </div>
            <div className="col-md-2 d-md-flex justify-content-center mt-4 mt-md-0">
              <div>
                <h4 className='text-primary fw-bold'>Links</h4>
                <p className='mt-3'>Admin</p>
                <p>Doctor</p>
                <p>Patient</p>
              </div>
            </div>
            <div className="col-md-2 d-md-flex justify-content-center mt-4 mt-md-0">
              <div>
                <h4 className='text-primary fw-bold'>Guides</h4>
                <p className='mt-3'>React</p>
                <p>React Bootstrap</p>
                <p>Bootswatch</p>
              </div>
            </div>
            <div className="col-md-4 md:px-5 mt-4 mt-md-0">
              <h4 className='text-primary fw-bold'>Contact Us</h4>
              <div className=" d-flex mt-3">
                <input type="text" placeholder='Email Id' className='form-control'/>
                <button className='btn btn-warning ms-3'>Contact</button>
                </div>
                
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default Footer