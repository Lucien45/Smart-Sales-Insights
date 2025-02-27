import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import error from '../assets/error.svg'
import '../assets/css/error.css'

const Page404: React.FC  = () => {
    const navigate = useNavigate();

    const feedback = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/')
        }else{
            navigate('/admin')
        }
    }

    useEffect(() =>{

    })

  return (
    <>
        <div className="error-content">
            <div className="">
                <h1 className="error-number">404</h1>
                <p className="mini-text">Ooops!</p>
                <p className="error-text mb-5 mt-1">The page you requested was not found!</p>
                <img src={error} alt="cork-admin-404" className="error-img"/>
                
                <button onClick={feedback} className="btn btn-dark mt-5">
                    Go Back
                </button>
            </div>
        </div>
    </>
  )
}

export default Page404