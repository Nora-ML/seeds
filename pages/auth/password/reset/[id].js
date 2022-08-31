import { useState,useEffect } from "react";
import Router, {withRouter} from "next/router";
import Layout from "../../../../components/Layout";
import axios from "axios";
import jwt from "jsonwebtoken";
import { showSuccessMessage,showErrorMessage } from "../../../../helpers/alert";
import {API} from "../../../../config.js"
import Link from "next/link";

// router prop is available since we wrapped this component withRouter
// router will be the token param [id] attached to the path auth/passwordrest in this case
const ResetPassword = ({router}) => {
    const [state, setState] = useState({
        name: "",
        resetPasswordLink:"",
        newPassword: "",
        buttonText: "New Password",
        success: "",
        error: ""
    })
    const { name,resetPasswordLink,newPassword, success, error, buttonText } = state;
    const handleChange = name=> e => {
        setState({...state,[name]:e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setState({...state,error:"",buttonText:"Processing ..",success:""})
        try {
            const response = await axios.put(`${API}/reset-password`, { newPassword ,resetPasswordLink});
            return setState({...state,error:"",newPassword:"",buttonText:"Done !",success:response.data.message})
        } catch (error) {
            return setState({...state,buttonText:"Resend link",error:error.response.data.error})
        };
    }

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setState({ ...state, name, resetPasswordLink: token });
        }
    }, [router])
    
    const passwordResetForm = () => (
        
        <form className="register_form-container--wrap" onSubmit={handleSubmit}>

            {(!error || (!error.includes("Expired") && !error.includes("Invalid")) )&&
                <>
                <h3>{name}, Please input new Password ..</h3>
                
                <div className="register_form-field register_form-field--email">
                     <input
                         type="password" placeholder="New Password.."
                         value={newPassword}
                         onChange={handleChange('newPassword')} required/>
                </div>
                
                <div className="register_form-field register_form-field--button">
                    
                    <input type="submit" value={buttonText} />
                </div>
                
                 </>
            }
            {error && (error.includes("Expired") || error.includes("Invalid")) &&
                <div className="register_form-field register_form-field--button">
                <Link href="/auth/password/forgot">
                    <input type="submit" value={buttonText} />
                    </Link>
                    </div>
            }
       
        </form>
    )


    return (
        <Layout>
            <div className="register_form-container">
                {success && <p>{showSuccessMessage(success)}</p>}
                {error &&
           
                    <p>{showErrorMessage(error)}</p>
    
                }
          
                {passwordResetForm()}
            </div>
        </Layout>
    )
}

// wrapping component withRouter makes the params (id in this case)
// available as props router
export default withRouter(ResetPassword);