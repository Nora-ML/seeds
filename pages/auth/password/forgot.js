import { useState } from "react";
import Router from "next/router";
import Layout from "../../../components/Layout";
import axios from "axios";
import { showSuccessMessage,showErrorMessage } from "../../../helpers/alert";
import {API} from "../../../config.js"

const ForgotPassword = () => {
    const [state, setState] = useState({
        email: "",
        buttonText: "Change Password",
        success: "",
        error: ""
    })
    const { email, success, error, buttonText } = state;
    const handleChange = name=> e => {
        setState({...state,[name]:e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setState({...state,error:"",buttonText:"Processing ..",success:""})
        try {
            const response = await axios.put(`${API}/forgot-password`, { email });
            return setState({...state,error:"",email:"",buttonText:"Done !",success:response.data.message})
        } catch (error) {
            return setState({...state,buttonText:"Change Password",error:error.response.data.error})
        };
    }

    const passwordForgotForm = () => (
        
        <form className="register_form-container--wrap" onSubmit={handleSubmit}>
          <h3>Send email reset link to...</h3>
            <div className="register_form-field register_form-field--email">
               {/*  <label>Email :</label> */}
                <input
                    type="text" placeholder="Email.."
                    value={email}
                    onChange={handleChange('email')} required/>
            </div>
            <div className="register_form-field register_form-field--button">
                <input type="submit" value={buttonText} />
             </div>
       
        </form>
    )


    return (
        <Layout>
            <div className="register_form-container">
                {success && <p>{showSuccessMessage(success)}</p>}
                {error && <p>{showErrorMessage(error)}</p>}
          
                {passwordForgotForm()}
            </div>
        </Layout>
    )
}

export default ForgotPassword;