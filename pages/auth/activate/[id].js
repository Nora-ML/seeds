import { useState,useEffect } from "react";
import { withRouter } from "next/router";
import Layout from "../../../components/Layout";
import jwt from 'jsonwebtoken';
import axios from "axios";
import { showSuccessMessage,showErrorMessage } from "../../../helpers/alert";
import {API} from "../../../config.js"

const ActivateAccount = ({ router }) => {
    const [state, setState] = useState({
        name: "",
        token: "",
        buttonText: "Activate",
        success: "",
        error:""
    })
    const { name, token, success, error, buttonText } = state;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setState({...state,name,token})
        }
    },[router])

    const clickSubmit = async e => {
        e.preventDefault();
        console.log("Activate account")
        setState({ ...state, buttonText: "Activating" })
        try {
            const response = await axios.post(`${API}/register/activate`, { token })
            console.log("response :", response)
            setState({...state,name:"",token:"",buttonText:"Activated",success:response.data.message})
        } catch (error) {
            console.log("error :", error)
            setState({...state,name:"",token:"",buttonText:"Activate Account",error:error.response.data.error})
        }
    }
    return (
        <Layout>
            <div className="register_form-container">
                <h1> Ready to activate your account ?</h1>
                <br />
                {success && <p>{showSuccessMessage(success)}</p>}
                {error && <p>{showErrorMessage(error)}</p>}
                <div className="register_form-field register_form-field--button">
                    <input type="submit" value={buttonText} onClick={ clickSubmit} />
             </div>
            </div>
        </Layout>
    )
}
export default withRouter(ActivateAccount);