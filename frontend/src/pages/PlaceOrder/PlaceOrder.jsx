import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// line 14 create the state where we store the information on the form list
// the on change handler is saving the input on the front end into the state variable 
// evenPreventDefualt means it should not reload the page, ie when submitting the form
// line 34 in the place order we are saving all the items data and quantity into the array
//the session url is the url from stripe which is the payment gateway

const PlaceOrder = () => {
    const { getTotalCartAmount,token, food_list, cartItems, url, } = useContext(StoreContext)

    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (event) =>{
        event.preventDefault();
        let orderItems = [];
        food_list.map((item)=>{
            if (cartItems[item._id]>0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+2,
        }
        let response = await axios.post(url+"/api/order/place", orderData,{headers:{token}})
        if (response.data.success) {
            const {session_url} = response.data;
            window.location.replace(session_url)
        }
        else{
            alert("Error")
        }
    }

    const navigate = useNavigate();

    useEffect(()=>{
        if (!token) {
            navigate('/cart')
        }
        else if (getTotalCartAmount()===0) {
            navigate('/cart')
        }
    },[token])
    // useEffect(()=>{
    //     console.log(data);
    // },[data])  to test it in our console

    
    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className='multi-fields'>
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                    <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className='multi-fields'>
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                    </div>
                    <button type='submit'>PROCEED TO Payment</button>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder