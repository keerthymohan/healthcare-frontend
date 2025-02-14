import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addDocumentsApi, deleteDocumentApi, getAllDocumentApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import { serverUrl } from '../services/serviceUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
faTrash

function Documents() {
  const [token, settoken] = useState(sessionStorage.getItem('token') || "")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [key, setKey] = useState(1)
  const [preview, setPreview] = useState("")
  const [alldoc, setAlldoc] = useState([])
  const [removedoc, setRemovedoc] = useState({})

  const [document, setDocument] = useState({
    title: "",
    docimage: ""
  })
  // console.log(document);


  const handleFile = (e) => {
    setDocument({ ...document, docimage: e.target.files[0] })
  }

  useEffect(() => {
    if (document.docimage) {
      setPreview(URL.createObjectURL(document.docimage))

    }
  }, [document.docimage])

  const addDocument = async () => {
    const { title, docimage } = document
    if (!title || !docimage) {
      toast.info('Enter the necessary details')


    } else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("docimage", docimage)
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await addDocumentsApi(reqBody, reqHeader)
        // console.log(result);
        if (result.status == 200) {
          toast.success("Documents uploaded successfully")
          setDocument({
            title: "",
            docimage: ""

          })
          handleClose()
          setPreview("")
          if (key == 1) {
            setKey(0)
          } else {
            setKey(1)
          }
        } else if (result.success == 406) {
          result.warning(result.response.data)
        } else {
          toast.error("something went wrong")
          handleClose()

        }

      } else {
        toast.warning('please login')
      }

    }
  }

  const getAllDocuments = async () => {
    const result = await getAllDocumentApi()
    // console.log(result);
    setAlldoc(result.data)

  }


  const handleDelete = async (id) => {
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await deleteDocumentApi(id, reqHeader)
      // console.log(result);
      if (result.status == 200) {
        setRemovedoc(result)
        toast.success('Delete successfullly')
      } else {
        toast.warning('something went wrong')
      }


    }
  }

  useEffect(() => {
    getAllDocuments()
  }, [removedoc])

  return (
    <>
      <button onClick={handleShow} className='btn btn-primary'>UPLOAD YOUR DOCUMENTS</button>
      <div className="container border rounded mt-5 p-3">
        <h3 className='text-center text-primary fw-bolder'>MY DOCUMENTS</h3>
        <div className="row">
          {alldoc.map((item) => (
            <div className="col-md-4 mt-3">
              <Card style={{ width: '1oo%' }}>
                <Card.Img variant="top" src={`${serverUrl}/upload/${item.docimage}`} style={{ height: '170px' }} />
                <Card.Body>
                  <div className='d-flex align-items-center justify-content-between'>
                    <h3>{item.title} </h3>
                    <button onClick={() => handleDelete(item?._id)} className='btn'><FontAwesomeIcon icon={faTrash} className='text-danger' /></button>
                  </div>

                </Card.Body>
              </Card>
            </div>

          ))}
        </div>

      </div>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>UPLOAD YOUR DOCUMENTS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2">
            <label htmlFor="">Title : </label>
            <input value={document.title} onChange={(e) => setDocument({ ...document, title: e.target.value })} type="text" className='form-control mt-2' />
          </div>
          <div className="mt-3">
            <label htmlFor="doctorimage">Upload Document:

              <input type="file" id='doctorimage' className='d-none' key={key} onChange={(e) => handleFile(e)} />
              <img src={preview ? preview : "https://thumbs.dreamstime.com/b/upload-documentation-vector-document-file-internet-page-icon-152160234.jpg"} alt="" style={{ width: '200px', height: '200px' }} />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addDocument}>
            Add Document
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' autoClose={2000} theme="colored" />

    </>
  )
}

export default Documents