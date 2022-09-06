import Layout from "../../components/Layout.js";
import withAdmin from "../withAdmin.js";
import Link from "next/link.js";
import style from "../../public/static/css/admindash.module.css";

const Admin = ({ user, token }) => {
	return (
		<Layout>
			<div> Admin Page</div>
			<div className={style.admindash_container}>
				<div className={style.admindash_leftpanel}>
					<ul className={style.admincommands_ul}>
						<Link href="/admin/category/create">
							<li className={style.admincommand_li}>Create Category</li>
						</Link>
					</ul>
				</div>
				<div className={style.admindash_rightpanel}></div>
			</div>
		</Layout>
	);
};

export default withAdmin(Admin);