import React, {useState, useEffect} from 'react'
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { isAuthenticated } from '../auth/helper';
import { getproducts, deleteproduct } from './helper/adminapicall';
export default function ManageProducts() {

    const [products, setproducts] =useState([]);

    const {user, token} = isAuthenticated();

    const preload = () => {
        getproducts().then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setproducts(data);
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisProduct = (productId) => {
        deleteproduct(productId, user._id, token)
        .then(data=> {
            if(data.error){
                console.log(data.error)
            }
            else{
                preload();
            }
        })
    }



    return (
        <Base title="Welcome Admin" description="Manage Products here">
        <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5">Products</h2>

            {products.map((product, index) => (
              
                <div key={index} className="row text-center mb-2 ml-3 ">
                
                  <div className="col-1">
                    <Link
                      className="btn btn-success"
                      to={`/admin/product/update/productId`}
                    >
                    <span className="">Update</span>
                    </Link>
                  </div>
                
                <div className="col-1">
                  <button onClick={() => {
                      deleteThisProduct(product._id)
                  }} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              
                <div className="col-7 offset-1">
                    <h3 className="text-white text-left">{product.name}</h3>
                </div>

              </div>
           
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
