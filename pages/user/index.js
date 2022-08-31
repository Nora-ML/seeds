import Layout from "../../components/Layout.js";
import axios from 'axios';
import { API } from "../../config.js";
import { getCookie } from "../../helpers/auth.js";
import withUser from "../withUser.js";

const User = ({user,token}) => {

    return (
        <Layout>
            <div> User Page</div>
            <div> {JSON.stringify(user)}</div>
        </Layout>
    )
};

// this runs on the server side th first time
// when it runs again it's from the client side
/* User.getInitialProps = async (context) => {
    console.log('getInitialProps context.req :', context.req)
    const token = getCookie('token', context.req);
    console.log('getInitialProps token :', token)
    
    try {
        const response = await axios.get(`${API}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
                contentType: 'application/json'
            }
        });
        console.log('getInitialProps response :', response.data)
        return { user: response.data };
    } catch (error) {
        //we are only concerened with unuthorized access error which is 401
        console.log('getInitialProps error :', error)
        
         if (error.response.status === 401) {
             return {user:'No user'}
         }
        
    }
}; */

export default withUser(User);