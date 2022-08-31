import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import {authenticate, isAuth} from "../helpers/auth"
import { showSuccessMessage,showErrorMessage } from "../helpers/alert";
import {API} from "../config.js"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText:"Login"
    });
    const {email, password,error,success,buttonText } = formData;


    /** Handle input in Login form and save it in the state */
    const handleChange = (name) => (e) => {
        setFormData({...formData,[name]:e.target.value,error:"",success:"",buttonText:"Login"})
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            buttonText: "Logging In"
        });
        try {
           const response= await axios
            .post(`${API}/login`, { email, password
            })
           // console.log("response:", response.data);
            // save user in localstorage and token in cookie
            authenticate(response.data, () => {
            //callback function to redirect the user 
                isAuth() && isAuth().role === 'admin' ?
                    Router.push('/admin') : Router.push('/user');
            })

        } catch (error) {
           // console.log("error:", error.response.data.error);
                setFormData({
                    ...formData,
                    error: error.response.data.error,
                    success:"",
                    buttonText: "Login"
                })
        } 
    }

    // if user is logged in it will redirect to home page
    useEffect(() => {
       isAuth() && Router.push('/') 
    },[])

    const loginForm = () => (
        
        <form className="register_form-container--wrap" onSubmit={handleSubmit}>
          <h3>Login in as ..</h3>
            <div className="register_form-field register_form-field--email">
               {/*  <label>Email :</label> */}
                <input
                    type="text" placeholder="Email.."
                    value={email}
                    onChange={handleChange('email')} required/>
            </div>
            <div className="register_form-field register_form-field--password">
                {/* <label>Password :</label> */}
                <input
                    type="password" placeholder="Password.."
                    value={password}
                    onChange={handleChange('password')} required />
             </div>
            <div className="register_form-field register_form-field--button">
                <Link href='/auth/password/forgot'>
                    <h4>Forgot Password?</h4>
                </Link>
                <input type="submit" value={buttonText} />
             </div>
       
    </form>
    )


    return (
        <Layout>
            <div className="register_form-container">
                {success && <p>{showSuccessMessage(success)}</p>}
                {error && <p>{showErrorMessage(error)}</p>}
          
                {loginForm()}
            </div>
        </Layout>
    )

};

export default Login;
