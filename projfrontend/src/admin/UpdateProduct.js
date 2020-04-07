import React, {useState, useEffect} from 'react'
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { getcategories, updateproduct, getProduct } from "../admin/helper/adminapicall"
import {isAuthenticated} from "../auth/helper/index" 

export default function UpdateProduct({match}) {

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
        updatedproduct: "",
        getaRedirect: false,
        formData: ""
    });

    const { name, description, price, inventory, categories, category, loading, error, updatedproduct, getaRedirect, formData } = values;

    const preload = productId => {
        getProduct(productId).then(data => {
          console.log(data)
        
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            preloadCategories();
            setValues({
              ...values,
              name: data.name,
              description: data.description,
              price: data.price,
              category: data.category.name,
              inventory: data.inventory,
              formData: new FormData()
            });
          }
        });
      };
    
      const preloadCategories = () => {
        getcategories().then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              categories: data,
              formData: new FormData()
            });
          }
        });
      };
    
      useEffect(() => {
        preload(match.params.productId);
      }, []);    
      
      const successMessage = () => (
        <div className="alert alert-success mt-3"
            style={{display: updatedproduct ? "" : "none"}}
        >
            <h4>{updatedproduct} created successfully </h4>
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
        updateproduct(match.params.productId,user._id, token, formData)
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
                    updatedproduct: data.name
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
    
    const updateProductForm = () => (
        <form className="mt-4">
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="description"
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
              name="price"
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>{category}</option>
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
              name="inventory"
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
            Update Product
          </button>
        </form>
      );
    
    
    
    
    
    return(
        <Base
        title="Update a Product here!"
        description="Welcome to Product Updation Section"
        className="container bg-info p-4"
        >
        
        <Link to="/admin/dashboard" className="btn brn-md btn-dark mb-3">
            Admin Home
        </Link>

        <div className="row bg-dark test-white rounded center">
            <div className="col-md-8 offset-md-20 ">
                {updateProductForm()}
                {successMessage()}
                {warningMessage()}
            </div>
        </div>

        </Base>
    )
}