import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
export const Transaction: React.FC = () => (
  //POOL
  <Row className="justify-content-center">
    <Col md={8} className="brds_10">
      <Row className="justify-content-center ">
        <Col md={12} className="pad_10 text_left">
        <br />
     <br />
     <br />
          <span className="font_25">
            <b>Transactions</b>
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
    <tr className="border-bottom">
      <th scope="col">Type</th>
      <th scope="col">Amount</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody className="bg_div_color pad_25">
    <tr>
      <th scope="row"></th>
      <td></td>
      <td></td>
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
