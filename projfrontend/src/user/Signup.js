import React, {useState} from"react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { signup } from "../auth/helper";

const Signup = () => {

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        userinfo: "",
        password: "",
        error: "",
        success: false
    });

    const {firstname, lastname, email, phone, userinfo, password, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({firstname, lastname, email, phone, userinfo, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            } else{
                setValues({
                    ...values,
                    firstname: "",
                    lastname: "",
                    email: "",
                    phone: "",
                    userinfo: "",
                    password: "",error: "",
                    success: true
                });
                console.log(data);
            }
        })
        .catch(console.log("Error in Signup"))
    };

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light"> First Name </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("firstname")}
                            value={firstname}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Last Name </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("lastname")}
                            value={lastname}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Email </label>
                            <input type="email" className="form-control"
                            onChange={handleChange("email")}
                            value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Phone </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("phone")}
                            value={phone}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> User Info </label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("userinfo")}
                            value={userinfo}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Password </label>
                            <input type="password" className="form-control"
                            onChange={handleChange("password")}
                            value={password}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                        
                        <button className="btn btn-info btn-block">Reset</button>
                    </form>
                </div>
            </div>
        );
    };

    const successMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-success"
        style={{display: success ? "" : "none"}}
        >
            New account was created successfully.
            <Link to="/signin">Login Here</Link>
        </div>
        </div>
        </div>
    )

    const errorMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger"
        style={{display: error ? "" : "none"}}
        >
            {error}
        </div>
        </div>
        </div>
    )



    return (
        <Base title="Sign Up Page" description="A page for user to sign up">
            {signUpForm()}
            {successMessage()}
            {errorMessage()}
            
            <p className="text-white text-center">{JSON.stringify(values)}</p>
            
        </Base>
    );
}

export default Signup;