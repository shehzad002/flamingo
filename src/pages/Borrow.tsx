import React, { useEffect, useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import borrowAbi from "./../components/abi/creditLine";
import {web3} from './../components/wallet/web3';

export const Borrow: React.FC = () => {
   const [balance,setbalance] = useState(0);
   const [limit,setLimit] = useState(0);
   const [interestApr, setInterestApr] = useState(0);
   const [interestOwned,setInterestOwned] = useState(0);
   const [principalOwned, setPrincipalOwned] = useState(0);
   const [value,setValue] = useState('');

   useEffect(() => {
     const borrowApi = async () => {
       console.log("working 2")
       const balance = await borrowAbi.methods.balance().call();
       console.log("this is balance",balance)
       const limit = await borrowAbi.methods.limit().call();
       const interestApr = await borrowAbi.methods.interestApr().call();
       const interestOwned = await borrowAbi.methods.interestOwed().call();
       const principalOwned = await borrowAbi.methods.principalOwed().call();
       
       setInterestOwned(interestOwned);
       setPrincipalOwned(principalOwned);
       setInterestApr(interestApr);
       setLimit(limit);
       setbalance(balance);
     }
     borrowApi();
   });

  
    const Borrow = async (e:any) => {
      e.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await borrowAbi.methods.assess().send({
          from: accounts[0],
      });
    }

    const payMent = async (e:any) => {
      e.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await borrowAbi.methods.drawdown(value).send({
          from: accounts[0],
      });
    }
 
 

  
  return(
  <Row className="justify-content-center">
    <Col md={8} className="brds_10">
      <Row className="justify-content-center ">
        <Col md={12} className="pad_10 text_left">
        <br />
     <br />
     <br />
          <span className="font_25">
            <b>Loading...</b>
          </span>
        </Col>
      </Row>
    </Col>
    <Col md={8} className=" bg_div_color brds_10">
      <Row className="justify-content-center ">
        <Col md={6} className="pad_25">
          <span className="font_25">Available to borrow</span>
          <br />
          <span className="font_25" id="">
           {balance} $
          </span>
          <br />
          <br />
         <form onSubmit={Borrow}> <button className="btn btn-secondary">
         
            Borrow
          </button> </form>
        </Col>
        <Col md={6} className="pad_25">
          <span className="font_25">Next payment</span>
          <br />
          <span className="font_25" id="">
            No payment due
          </span>
          <br />
          <br />
         <form onSubmit={payMent}> 
         <input type="number"   value={value}
            onChange={(e) => setValue(e.target.value)} /> 
         <button className="btn btn-secondary">
        
            Pay
          </button>
          </form>
        </Col>
      </Row>
    </Col>
    <Col md={12} className="  brds_10">
      <br />
      <br />
    </Col>
    <Col md={8} className=" bg_div_color brds_10">
      <Row className="justify-content-center ">
        <br />
        <Col md={12} className="  brds_10 left_text">
          <br />
          <span className="font_25">Credit Status</span>
          <br />
          <ProgressBar striped variant="success" animated now={90} key={1} />
        </Col>

        <Col md={6} className="pad_25 left_text">
          <span className="font_25" id="">
            {balance - interestOwned} $
          </span>
          <br />
          <span className="font_25">Balance plus interest</span>
          <br />
        </Col>
        <Col md={6} className="pad_25 right_text">
          <span className="font_25" id="">
            {principalOwned} $
          </span>
          <br />
          <span className="font_25">Available to drawdown</span>
          <br />
        </Col>
      </Row>

      <Row className="justify-content-left ">
      <Col md={12} className="pad_25 left_text"><hr></hr></Col>
        <Col md={4} className="pad_25 left_text">
          <span className="font_25" id="">
           {limit} $
          </span>
          <br />
          <span className="font_25">Limit</span>
          <br />
        </Col>
        <Col md={4} className="pad_25 left_text">
          <span className="font_25" id="">
            {interestApr / 1e18} %
          </span>
          <br />
          <span className="font_25">Interest rate APR</span>
          <br />
        </Col>
        <Col md={4} className="pad_25 left_text">
          <span className="font_25" id="">
            $0.00
          </span>
          <br />
          <span className="font_25">Payment frequency</span>
          <br />
        </Col>{" "}
        <Col md={4} className="pad_25 left_text">
          <span className="font_25" id="">
            $0.00
          </span>
          <br />
          <span className="font_25">Payback term</span>
          <br />
        </Col>
      </Row>
    </Col>
  </Row>
); }
