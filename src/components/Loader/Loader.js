import React from 'react'
import './Loader.css';

const Loader = () => {

  return (
    <div className='overlay'>
        <div className="spinner-border" style={{width: '75px', height: '75px'}}></div>
    </div>    
  )
}

export default Loader;