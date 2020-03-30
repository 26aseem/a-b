import React, {useState, useEffect} from 'react'
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { getcategories, createproduct } from "../admin/helper/adminapicall"
import {isAuthenticated} from "../auth/helper/index" 

export default function AddProduct() {

    const {user, token} = isAuthenticated();

    const [values, setValues] = useState({
        name:"",
        description:"",
        price: "",
        inventory: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        CreatedProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const { name, description, price, inventory, categories, category, loading, error, createdproduct, getaRedirect, formData } = values;

    const preload = () => {
        getcategories().then(data=>{
            if(data.error) {
                setValues({...values, error: data})
            } else{
                setValues({...values, categories: data, formData: new FormData()});
               // console.log(categories);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [] )

    const successMessage = () => (
        <div className="alert alert-success mt-3"
            style={{display: createdproduct ? "" : "none"}}
        >
            <h4>{createdproduct} created successfully </h4>
        </div>
    )

    const warningMessage = () => (
        <div className="alert alert-danger mt-3"
            style={{display: error ? "" : "none"}}
        >
            <h4>{error} </h4>
        </div>
    )

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: "", loading: true})
        createproduct(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    inventory: "",
                    photo: "",
                    loading: false,
                    createdproduct: data.name
                })
            }
        }

        )
        .catch()
    }

    const handleChange = name => event => {
        const value = name ==="photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]:value})
    };
    
    const createProductForm = () => (
        <form className="mt-4">
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select the Category</option>
              {categories && categories.map((cate, index) =>{
                  return(
                      <option key={index} value={cate._id}>
                          {cate.name}
                      </option>
                  )
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("inventory")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={inventory}
            />
          </div>
          <span className="text-white">Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-4">
            Create Product
          </button>
        </form>
      );
    
    
    
    
    
    return(
        <Base
        title="Add a Product here!"
        description="Welcome to Product Creation Section"
        className="container bg-info p-4"
        >
        
        <Link to="/admin/dashboard" className="btn brn-md btn-dark mb-3">
            Admin Home
        </Link>

        <div className="row bg-dark test-white rounded center">
            <div className="col-md-8 offset-md-20 ">
                {createProductForm()}
                {successMessage()}
                {warningMessage()}
            </div>
        </div>

        </Base>
    )
}