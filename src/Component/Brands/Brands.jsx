import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Brands() {


  let [BrandsList, setBrands] = useState([])


  useEffect(() => {
    getAllBrands()
}, [])
async function getAllBrands() {
    let req = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    setBrands(req.data.data)
    console.log(BrandsList);
    console.log(req);
}










  return (
    <>
        <Helmet>
    <title>Brands</title>
</Helmet>


<div className="container">
  <div className="row">
    {BrandsList?.map((cat)=>(
      <div className="col-md-4">
        <div className="card text-center">
          <div className=" card-body">
            <div style={{height:"500",objectFit:"cover",objectPosition:"center"}} className=" card-img">
              <img className=' img-fluid' src={cat.image} alt={cat.name} />
              <div className="text-main cart-title">{cat.name}</div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </>

  )
}
