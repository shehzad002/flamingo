import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import rewardAbi from "./../components/abi/rewards"
import gfiAbi from "./../components/abi/GFI"


export const FFI: React.FC = () => {
  const [totalReward,setTotalReward] = useState(0);
  const [tokenId,setTokenId] = useState(0);
  const [claimRewards,setClaimRewards] = useState(0);
  const [totalSupply,setTotalSupply] = useState(0);
  const [totalToken, setTotalToken] = useState(0);
  useEffect(() => {

    const rewards = async () => {
      console.log("worked")
      const totalReward =await rewardAbi.methods.rewardsAvailable().call();
      const tokenId = await rewardAbi.methods._tokenIdTracker().call();
      const claimRewards = await rewardAbi.methods.claimableRewards(tokenId - 1).call();
     
      const totalToken = totalReward + claimRewards;
      
      setTotalToken(totalToken);
     
      setTokenId(tokenId);
      setClaimRewards(claimRewards);
      setTotalReward(totalReward);
    }
   rewards();
  });

  useEffect(() => {
    const GFI = async () => {
      const totalSupply = await gfiAbi.methods.totalSupply().call();

      setTotalSupply(totalSupply);
    }
   GFI();
  })
  
  
  return(
  //POOL
  <Row className="justify-content-center">
    <Col md={8} className="brds_10">
      <Row className="justify-content-center ">
        <Col md={12} className="pad_10 text_left">
        <br />
     <br />
     <br />
          <span className="font_25">
            <b>FFI</b>
          </span>
        </Col>
      </Row>
    </Col>
    <Col md={8} className=" bg_div_color brds_10">
      <Row className="justify-content-center ">
        <Col md={6} className="pad_25">
           
          <span className="font_25">Total FFI</span>
          <br />
          <span className="font_25" id="pool_portfolio_balance">
            {totalSupply / 1e18} FFI
          </span>
          <br />
        </Col>
        <Col md={6} className="pad_25">
        <table className="table table-borderless">
  <thead>
   
  </thead>
  <tbody className="bg_div_color pad_25">
    <tr>
      <th scope="row">Claimable</th>
      <td>{claimRewards / 1e18} FFI</td>
    </tr>
    <tr>
      <th scope="row">Still Locked</th>
      <td>{totalReward / 1e18} FFI</td>
    </tr>
    <tr className='border-top'>
      <th scope="row">Total</th>
      <td>{totalToken} FFI</td>
    </tr>
   
  </tbody>
</table>
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
      <th scope="col">Type</th>
      <th scope="col">Locked FFI</th>
      <th scope="col">Claimable FFI</th>
    </tr>
  </thead>
  <tbody className="bg_div_color pad_25">
    <tr>
      <th scope="row">Senior Pool</th>
      <td>{totalReward / 1e18}</td>
      <td>{claimRewards / 1e18}</td>
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
