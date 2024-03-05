import axios from "axios";
import { data } from "jquery";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Allorders() {
  let [carts,setcarts]=useState([])
  const token = localStorage.getItem("userToken");
  const x = jwtDecode(token);
  console.log(x);
  useEffect(async function getMyOrders() {
   
    const token = localStorage.getItem("userToken");
    const { id } = jwtDecode(token);
    console.log(id);
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    console.log("orders",data);
setcarts(data)
  }, []);

  
  return <>
   <Helmet>
                <title>My Orders</title>
            </Helmet>
    
<div className="container">
  <h2>
    {carts? `You have placed ${carts.length} orders`:''}
  </h2>
  { carts.map((cart)=>(
     <div key={cart._id} className="row m-2 bg-body-secondary border-bottom pb-2">
      <p> <strong>Created at :</strong>  {cart.createdAt} <span> <strong>Payment Method :</strong> {cart.paymentMethodType}</span> </p>
      <p> <strong>items:</strong>  {cart.cartItems.length} <span><strong>Total Price :{cart.totalOrderPrice} <span>EGP</span> </strong></span></p>
{cart.cartItems.map((item)=>(
      <div key={item._id} className="col-md-2 col-sm-3">
<p> <strong>Price: </strong> {item.price} <span><strong> Count :</strong> <span>{item.count}</span></span></p>
    <img className=" img-fluid" src={item.product.imageCover} alt={item.product.title} />
    <p>{item.product.title.split(" ").slice(0, 2).join(" ")}</p>
      </div>

))}
  </div>
  ))}
 
</div>

  </>;
}
