import { useState,useEffect } from "react";
import Layout from "../components/Layout"
import axios from 'axios';
import Router from 'next/router'
import { showSuccessMessage,showErrorMessage } from "../helpers/alert";
import { API } from "../config.js";
import {isAuth} from "../helpers/auth"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText:"Register"
    });
    const { name, email, password,error,success,buttonText } = formData;


    /** Handle input in register form and save it in the state */
    const handleChange = (name) => (e) => {
        setFormData({...formData,[name]:e.target.value,error:"",success:"",buttonText:"Register"})
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            buttonText: "Registering"
        });
        try {
           const response= await axios
            .post(`${API}/register`, {
            name, email, password
            })
            console.log("response:", response);
            setFormData({
                name: "",
                email: "",
                password: "",
                error: "",
                success: response.data.message,
                buttonText: "Submitted"
            })
        } catch (error) {
            console.log("error:",error.response.data.error);
                setFormData({
                    ...formData,
                    error: error.response.data.error,
                    success:"",
                    buttonText: "Register"
                })
        } 
    }

    // if user is logged in it will redirect to home page
    useEffect(() => {
        isAuth() && Router.push('/') 
     },[])
    

    const registerForm = () => (
        
        <form className="register_form-container--wrap" onSubmit={handleSubmit}>
          <h3>Create An Account</h3>
            <div className="register_form-field register_form-field--name">
                {/* <label>Name :</label> */}
                <input
                    type="text" placeholder="Name.."
                    value={name}
                    onChange={handleChange('name')}
                required/>
            </div>
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
                <input type="submit" value={buttonText}/>
             </div>
       
    </form>
    )


    return (
        <Layout>
            <div className="register_form-container">
                {success && <p>{showSuccessMessage(success)}</p>}
                {error && <p>{showErrorMessage(error)}</p>}
          
                {registerForm()}
            </div>
        </Layout>
    )

};

export default Register;