import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  Nav, Navbar } from 'react-bootstrap';


import {web3, handleConnect} from './wallet/web3';



export const NavigationBar: React.FC = () => {
  const [refresh, setRefresh] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [accounts, setAccounts] = useState<string[]>([]);
    
  
    useEffect(()=>{
      const interval = setInterval(()=>{setRefresh(!refresh)}, 1000);
      return ()=>{
        clearInterval(interval)
      }
    }, [])
  
    useEffect(()=>{
      const fetchAccounts = async ()=>{
        try{
  
          const _addresses = await web3.eth.getAccounts();
          setAccounts(_addresses)
        }catch(e){
          setAccounts([])
        }
      }
  
      fetchAccounts();
    },[refresh])
  
   
    useEffect(()=>{
      if(accounts.length > 0){
        setIsConnected(true);
      }else{
        setIsConnected(false)
      }
    }, [accounts])
  



  return(
    <>
  
    <Navbar expand="md" >
      <Navbar.Brand href="/" className=''>  <img src="./flamingo.png" alt="" className='logo brand_logo_main'/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <ul className="nav navbar-nav navbar-right connect_btn">
               
               <li>
               {!isConnected ?
    <button onClick={e=>{e.preventDefault(); handleConnect()}} className="btn btn-info btn-lg" >Connect</button>
    :
    <>
  
    <button onClick={e=>{e.preventDefault()}} className="btn btn-info btn-lg">Connected</button>
  </>
  }
               </li>
           </ul>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="flex-column">
        <Nav.Item  id="brand_logo">
            <Nav.Link as={Link} to="/" >
        <img src="./flamingo.png" alt="" className='logo'/>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/earn">
             Earn
            </Nav.Link>
          </Nav.Item>
   
           <Nav.Item>
            <Nav.Link as={Link} to="/borrow">
             Borrow
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/ffi">
             FFI
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/transfer">
             Transction
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  </>
  )
}

