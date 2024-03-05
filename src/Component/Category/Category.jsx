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
}




  return (


    <div>
   <Helmet>
    <title>Categories</title>
</Helmet>


    </div>
  )
}
