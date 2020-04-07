import React, {useState, useEffect} from 'react'
import Base from "../core/Base"
import { isAuthenticated } from "../auth/helper/index"
import {Link} from "react-router-dom";
import {updatecategory,getcategory} from "./helper/adminapicall"

export default function UpdateCategory({match}) {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const goBack = () => (
        <div className="mt-5">
            <Link 
            className="btn btn-sm btn-info mb-3"
            to = "/admin/dashboard"
            >
                Admin Dashboard
            </Link>
        </div>
    )

    const preload = categoryId => {
        console.log(categoryId)
        getcategory(categoryId).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setName(data.name);
            }
          });
        }
    
      useEffect(() => {
        preload(match.params.categoryId);
      }, []);    
      

    const handleChange = (event) => {
        setError("");
        setName(event.target.value)
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        //backend request fired
        updatecategory(match.params.categoryId,user._id, token, {name})
            .then(data => {
                if(data.error){
                    setError(data.error)
                }
                else{
                    setError("")
                    setSuccess(true)
                    setName("")
                }
            })
            .catch(data => {
                console.log(data.error)
            })

    };

    const successMessage = () => {
        if(success){
            return (
                <h4 className="text-success">
                    Category Updated
                </h4>
            )
        }
    };

    const warningMessage = () => {
        if(error){
            return (
                <h4 className="text-danger">
                    {error}
                </h4>
                
            )
        }
    };


    const myCategpryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead"> Update the Category</p>
                <input type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex. Summer Collection"
                />
                <button 
                onClick ={onSubmit}
                className="btn btn-outline-info"> Update Category </button>
            </div>
        </form>
    )




    return (
        <Base
        title="Update a Category"
        description="Update a Category"
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8">
                {myCategpryForm()}
                {goBack()}
                {successMessage()}
                {warningMessage()}
                
                </div>
            </div>
            
        </Base>
    )
}
