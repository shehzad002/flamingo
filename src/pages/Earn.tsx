import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import abi from "./../components/abi/index";
import balanceAbi from "./../components/abi/fidu";
import {web3} from './../components/wallet/web3';

export const Earn: React.FC = () => {
  
  
  const [loan,setLoan] = useState(0);
  const [myBalance, setmyBalance] = useState(0);
  const [accounts,setAccounts] = useState();
  const [value,setValue] = useState('');
  const [assets, setAssets] = useState(0);
  
  useEffect(() => {
    const dataApi = async () => {
      

      // const CurrentPrice = web3.utils.fromWei(Price, 'ether');

        const loan = await abi.methods.totalLoansOutstanding().call();
        const assets = await abi.methods.assets().call();

        setAssets(assets);
       
  
        
      setLoan(loan);
      
    
    };
    dataApi();
  });


  useEffect(() =>  {
   const myBal = async () => {
    const accounts = await web3.eth.getAccounts();
     
    
    if(accounts.length > 0) {
     const myBalance = await balanceAbi.methods.balanceOf(accounts[0]).call();
     
     setmyBalance(myBalance);
     console.log(myBalance);
    }

   }
   myBal();
  });

  const depositIT = async (e:any) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await abi.methods.deposit(value).send({
        from: accounts[0],
    });
}

const withdrawIT = async (e:any) => {
  e.preventDefault();
  const accounts = await web3.eth.getAccounts();
  await abi.methods.withdraw(value).send({
      from: accounts[0],
  });
}

const withdrawFidu = async (e:any) => {
  e.preventDefault();
  const accounts = await web3.eth.getAccounts();
  await abi.methods.withdrawInFidu(value).send({
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
            <b>Pools</b>
          </span>
        </Col>
      </Row>
    </Col>
    <Col md={8} className=" bg_div_color brds_10">
      <Row className="justify-content-center ">
        <Col md={6} className="pad_25">
          <span className="font_25">Portfolio balance</span>
          <br />
          <span className="font_25" id="pool_portfolio_balance">
          {myBalance / 1e18} FIDU 
          </span>
          <br />
        </Col>
        <Col md={6} className="pad_25">
          <span className="font_25">Est. Annual Growth</span>
          <br />
          <span className="font_25" id="pool_annual_balance">
            0.00 $
          </span>
        </Col>
      </Row>
    </Col>
    <Col md={8} className="  brds_10">
      <br/>
      <br/>
      <br/>
    {/* SENIOR POOL */}
    <table className="table table-borderless">
  <thead>
    <tr>
      <th scope="col">Senior Pool Status</th>
      <th scope="col">Loan Outstanding</th>
      <th scope="col">Default Rate %</th>
      <th scope="col">Portfolio Balance</th>
      <th scope="col">Est. Annual Growth</th>
      <th scope="col">Supply</th>
      <th scope="col">Withdraw</th>
      <th scope="col">Withdraw Fidu</th>
      
    </tr>
  </thead>
  <tbody className="bg_div_color pad_25">
    <tr>
      <th scope="row">{Number(assets / 1e7).toFixed(2)} $</th>
      <td>{Number(loan / 1e9).toFixed(4)}$</td>
      <td>0.00%</td>
      <td>{myBalance / 1e18} FIDU</td>
      <td>0.00 $ <br /> 0.00 APY</td>
      <td> <form onSubmit={depositIT}>
        <input type="number"   value={value}
            onChange={(e) => setValue(e.target.value)} /> 
        <button>Supply</button></form></td>
      <td>
      <form onSubmit={withdrawIT}>
        <input type="number"   value={value}
            onChange={(e) => setValue(e.target.value)} /> 
        <button>Withdraw</button></form>
      </td>

      <td>
      <form onSubmit={withdrawFidu}>
        <input type="number"   value={value}
            onChange={(e) => setValue(e.target.value)} /> 
        <button>Withdraw Fidu</button></form>
      </td>
     
    </tr>
   
  </tbody>
</table>
{/* SENIOR POOL */}
<br/>
<br/>
{/* Borrower Pools */}

{/* SENIOR POOL */}
    </Col>
  </Row>

);
}
