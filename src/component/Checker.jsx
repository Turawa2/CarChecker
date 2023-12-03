import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


function Checker() {
  const navigate = useNavigate();
  const id =sessionStorage.getItem("user");
  useEffect(()=>{
    if(!id){
        window.location.href='/login'
    }
  },[id]
  );
  return id;
}

export default Checker
