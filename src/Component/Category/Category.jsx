import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Category() {
  let [categoryList, setCategory] = useState([])


  useEffect(() => {
    getAllCategory()
}, [])
async function getAllCategory() {
    let req = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategory(req.data.data)
    console.log(categoryList);
    console.log(req);
}




  return (


    <div>
   <Helmet>
    <title>Categories</title>
</Helmet>

<div className="container">
  <div className="row">
    {categoryList?.map((cat)=>(
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

    </div>
  )
}
