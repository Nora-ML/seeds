import axios from "axios";
import { API } from "../config.js";
import { getCookie } from "../helpers/auth.js";

// withAdmin is a High Order Component that will recieve user/admin components as parameter,
// The HOC contains certain logic that we want to apply to the component that we pass as a parameter. 
//After applying that logic, the HOC returns the element with the additional logic.
const withAdmin = Page => {
    console.log("withAdmin wrap is rendered .")

    // Our HOC will return a functional component ( props => {})
    // this is a render props pattern
    // it will return the Page with props
    // props will be whatever is returned from "getInitialProps"
    const WithAdminUser = props => <Page {...props} />;

    // Whatever is returned from getInitialProps will be passed 
    // tthrough withAdmin functional component as props to the Page component
    WithAdminUser.getInitialProps = async context => {
        const token = getCookie('token', context.req);
        let user = null;
        // fetching user authorization from the server
        if (token) {
            try {
							const response = await axios.get(`${API}/admin`, {
								headers: {
									authorization: `Bearer ${token}`,
									contentType: "application/json",
								},
							});
							console.log("withAdmin user:", response.data);
							user = response.data;
						} catch (error) {
							if (error.response.status === 401) {
								user = null;
							}
						}
        }
        // if user not authorized we wil redirect to home page
        if (user === null) {
            //redirect in the server side 
            context.res.writeHead(302, {
                Location: '/'
            })
            context.res.end();
            // if User is authorized we will return the props we want to pass to the Page component
        } else {
            return {
                ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
                user,
                token
            }
        }
    }
    return WithAdminUser;
};

export default withAdmin;