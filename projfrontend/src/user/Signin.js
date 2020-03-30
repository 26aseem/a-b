import React, {useState} from"react"
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"
import {signin, authenticate, isAuthenticated} from "../auth/helper"


const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });
    
    const { email, password, error, loading, didRedirect } = values
    const {user} = isAuthenticated();


    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading:true})
        signin({email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            } else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }
        })
        .catch(console.log("Error in Signin"))
    };

    const performRedirect = () => {

        if(didRedirect){
            if(user && user.role === 1){
                return(
                    <Redirect to="/admin/dashboard" />
                )
            }
            else{
                return(
                    <Redirect to="/user/dashboard" />
                )
            }
        }
        if(isAuthenticated){
            return <redirect to="/" />
        }
    };

    const signIpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light"> Email </label>
                            <input type="email"
                            value={email} onChange={handleChange("email")}
                            className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Password </label>
                            <input type="password"                         
                            value={password} onChange={handleChange("password")}
                            className="form-control"/>
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit}>Submit</button>
                        
                        <button className="btn btn-info btn-block">Reset</button>
                    </form>
                </div>
            </div>
        );
    };

    const loadingMessage = () => (
       loading && (
           <div className="alert alert-info">
               <h2>Loading...</h2>
           </div>
       )
    )

    const errorMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-center">
        <div className="alert alert-danger"
        style={{display: error ? "" : "none"}}
        >
            {error}
        </div>
        </div>
        </div>
    )



    return (
        <Base title="Sign In Page" description="A page for user to sign in">
            {signIpForm()}
            {loadingMessage()}
            {errorMessage()}
            {performRedirect()}

            
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    );
}

export default Signin;