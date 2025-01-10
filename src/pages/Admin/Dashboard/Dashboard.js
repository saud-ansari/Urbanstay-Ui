import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseSessionStorage } from '../../../constants/SessionStorage';

const Dashboard = () => {

  const [user] = UseSessionStorage('userInfo','')
  const navigate = useNavigate();

  useEffect(()=>{

    if(!user){
      navigate('/login?=admin')
    }
  },[navigate])
  
  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
