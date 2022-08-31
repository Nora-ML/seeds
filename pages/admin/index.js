import Layout from "../../components/Layout.js";
import withAdmin from "../withAdmin.js"

const Admin = ({user,token}) => {
    return (
        <Layout>
           <div> Admin  Page</div>
           <div>{JSON.stringify(user)}</div>
        </Layout>
    )
}

export default withAdmin(Admin);