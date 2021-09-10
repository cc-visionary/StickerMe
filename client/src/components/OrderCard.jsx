import React from 'react';

import '../assets/styles/components/admin/OrderCard.css';

const OrderCard = ({ order }) => (
  <div id="order-card">
    <div className="header">
      <div className="left-header">
        <div className="full-name">{`${order.contact.firstName} ${order.contact.lastName}`}</div>
        <div className="date">
          {new Date(order.date).toLocaleDateString('en-us', {
            year: 'numeric', month: 'long', day: '2-digit',
          })}
        </div>
      </div>
      <div className="right-header">
        <span className={order.status.toLowerCase()}>{` ${order.status}`}</span>
      </div>
    </div>
    <div className="body">
      <div className="price">
        <div className="label">TOTAL PRICE:</div>
        <div className="value">{`$${parseFloat(order.totalPrice.$numberDecimal).toFixed(2)}`}</div>
      </div>
      <div className="quantity">
        <div className="label">QUANTITY:</div>
        <div className="value">{order.character.quantities.reduce((a, b) => a + b)}</div>
      </div>
      <div>
        <div className="label">ADDRESS:</div>
        <p className="value">{order.contact.address1}</p>
        <p className="value">{order.contact.address2}</p>
      </div>
      <div>
        <div className="label">INSTRUCTIONS:</div>
        {console.log(order)}
        <div className="value">{order.additionalNotes === '' ? 'No additional instructions' : order.additionalNotes}</div>
      </div>
      <div>
        <div className="label">POSES:</div>
        {order.character.poses.map((p, i) => <div>{`${p.imageID}: ${order.character.quantities[i]} pcs`}</div>)}
      </div>
      <div>
        <div className="label">PARTS:</div>
        <div className="part-item">
          <div>ACCESSORIES:</div>
          <div>{order.character.accessories}</div>
        </div>
        <div className="part-item">
          <div>BACKHAIR:</div>
          <div>{order.character.backHair}</div>
        </div>
        <div className="part-item">
          <div>BANGS:</div>
          <div>{order.character.frontHair}</div>
        </div>
        <div className="part-item">
          <div>BASEHAIR:</div>
          <div>{order.character.baseHair}</div>
        </div>
        <div className="part-item">
          <div>BLUSH:</div>
          <div>{order.character.blush}</div>
        </div>
        <div className="part-item">
          <div>EARS:</div>
          <div>{order.character.ear}</div>
        </div>
        <div className="part-item">
          <div>EXTRAHAIR:</div>
          <div>{order.character.extraHair}</div>
        </div>
        <div className="part-item">
          <div>EYEBROWS:</div>
          <div>{order.character.eyebrows}</div>
        </div>
        <div className="part-item">
          <div>EYES:</div>
          <div>{order.character.eyes}</div>
        </div>
        <div className="part-item">
          <div>SIDEHAIR:</div>
          <div>{order.character.sideHair}</div>
        </div>
        <div className="part-item">
          <div>MOUTH:</div>
          <div>{order.character.mouth}</div>
        </div>
        <div className="part-item">
          <div>NOSE:</div>
          <div>{order.character.nose}</div>
        </div>
      </div>
    </div>
  </div>
);
export default OrderCard;
