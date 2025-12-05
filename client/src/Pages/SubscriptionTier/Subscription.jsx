import React from 'react'
import "./Subscription.css";
// import { order as placeOrder, verifyOrder } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { handlePayment } from '../../actions/subscription';
import { useNavigate } from 'react-router-dom';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
// import { placeOrder } from '../../actions/subscription';

const Subscription = () => {
    const User = useSelector((state) => (state.currentUserReducer));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSub = async (amount) => {
        if (User === null) {
            alert("login or signup to buy a subscription");
            navigate("/Auth");
          } else {
            dispatch(handlePayment(User.result._id, amount));
          }
    }

  return (
    <div className='home-container-1'>
    <LeftSidebar />
    <div className='subs-container'>
        <h2>Choose your plan</h2>
    <div className="pricing-table">
        <div className="pricing-card">
            <h3 className="pricing-card-header">Free Plan</h3>
            <div className="price"><sup>₹</sup>0<span>/MO</span></div>
            <ul>
                <li><strong>1</strong> Question/Day</li>
                <li><strong>250</strong> Character Limit</li>
            </ul>
            <button className="order-btn">Order Now</button>
        </div>

        <div className="pricing-card">
            <h3 className="pricing-card-header">Silver Plan</h3>
            <div className="price"><sup>₹</sup>100<span>/MO</span></div>
            <ul>
            <li><strong>5</strong> Question/Day</li>
                <li><strong>Unlimited</strong> Character Limit</li>
            </ul>
            <button className="order-btn" onClick={() =>handleSub(100)} >Order Now</button>
        </div>

        <div className="pricing-card">
            <h3 className="pricing-card-header">Gold Plan</h3>
            <div className="price"><sup>₹</sup>1,000<span>/MO</span></div>
            <ul>
            <li><strong>Unlimited</strong> Question/Day</li>
                <li><strong>Unlimited</strong> Character Limit</li>
            </ul>
            <button className="order-btn" onClick={() => {handleSub(1000)}}>Order Now</button>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Subscription
