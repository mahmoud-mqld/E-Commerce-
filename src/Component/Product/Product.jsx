import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { WishListContext } from "./../../Context/WishListContext";

export default function Product({ item }) {
  let {
    wishListcounter,
    setwishListCounter,
    addTowishList,
    removeFromwishList,
  } = useContext(WishListContext);
  let [fav, setFav] = useState(false);

  let { addCart, setnumOfCartItems } = useContext(CartContext);
  let [page, setPage] = useState(1);
  function getProducts(queryParm) {
    console.log();
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${queryParm.queryKey[1]}`
    );
  }
  let { isLoading, data, isError } = useQuery(
    ["productApi", page],
    getProducts
  );

  let [loading, setloading] = useState(false);

  async function addToCart(id) {
    let req = await addCart(id);
    if (req.data.status == "success") {
      setnumOfCartItems(req.data.numOfCartItems);
      toast.success(req.data.message, {});
    }
    console.log(req);
  }
  async function addToCart(id) {
    setloading(true);
    let req = await addCart(id);
    if (req.data.status == "success") {
      setnumOfCartItems(req.data.numOfCartItems);
      toast.success(req.data.message, {});
      setloading(false);
    }
    console.log(req);
  }

  async function addProductToWishList(productId) {
    let data = await addTowishList(productId);
    setFav(true);
    setwishListCounter(data.data.length);
    toast.success(data.message);

    console.log(data);
  }

  async function removeProductToWishList(productId) {
    let data = await removeFromwishList(productId);
    setFav(false);
    console.log(data);
    toast.error(data.message);
    setwishListCounter(data.data.length);
  }

  return (
    <div key={item.id} className="col-md-3">
      <div className="product p-3 text-center  position-relative">
        <Link to={`/ProductDetails/${item.id}`}>
          <img src={item.imageCover} className="w-100" alt="" />
          <h6 className="text-main">{item.category.name}</h6>
          <h5 className="fw-bold">
            {item.title.split(" ").slice(0, 2).join(" ")}
          </h5>
          <div className="d-flex justify-content-between">
            <span>{item.price}EGP</span>
            <span>
              {" "}
              <i className="fa-regular fa-star rating-color"></i>
              {item.ratingsAverage}
            </span>
          </div>
        </Link>
        <div
          style={{ cursor: "pointer" }}
          className=" d-flex justify-content-between align-items-center g-1">
          {fav ? (
            <i
              onClick={() => removeProductToWishList(item.id)}
              style={{ cursor: "pointer", color: "red" }}
              className=" fa-solid fa-heart"></i>
          ) : (
            <i
              onClick={() => addProductToWishList(item.id)}
              style={{ cursor: "pointer" }}
              className=" fa-solid fa-heart"></i>
          )}
          <button
            disabled={loading}
            onClick={() => addToCart(item.id)}
            className="btn bg-main text-white w-75 d-block">
            {loading ? (
              <i class="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
