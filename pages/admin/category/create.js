import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import {
	showSuccessMessage,
	showErrorMessage,
} from "../../../helpers/alert.js";
import Layout from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import style from "../../../public/static/css/admindash.module.css";

const Create = ({ user, token }) => {
	const [state, setState] = useState({
		name: "",
		content: "",
		error: "",
		success: "",
		formData: typeof window !== "undefined" && new FormData(),
		buttonText: "Create",
		imageUploadText: "Upload Image",
	});

	const {
		name,
		content,
		error,
		success,
		formData,
		buttonText,
		imageUploadText,
	} = state;

	const handleChange = (name) => (e) => {
		const value = name === "image" ? e.target.files[0] : e.target.value;
		const imageName =
			name === "image" ? e.target.files[0].name : "Upload Image";
		// we will be sending formdata not json data to the server
		// we will have to populate the formData to later send it on submit
		formData.append(name, value);
		setState({
			...state,
			[name]: value,
			error: "",
			success: "",
			imageUploadText: imageName,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setState({
			...state,
			buttonText: "Creating",
		});
		try {
			console.log(formData);
			const response = await axios.post(`${API}/category`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("category create response:", response);
			setState({
				...state,
				name: "",
				formData: typeof window !== "undefined" && new FormData(),
				success: "Category Successfuly added",
				error: "",
				imageUploadText: "Upload Image",
				buttonText: "Category Created !",
			});
		} catch (error) {
			console.log("error:", error.response.data.error === undefined);
			setState({
				...state,
				name: "",
				success: "",
				formData: typeof window !== "undefined" && new FormData(),
				error:
					error.response.data.error === undefined
						? error.message
						: error.response.data.error,
				imageUploadText: "Upload Image",
				buttonText: "Create",
			});
		}
	};
	const createCategoryForm = () => (
		<form className="register_form-container--wrap" onSubmit={handleSubmit}>
			<h3>Create New Category</h3>
			{success && <p>{showSuccessMessage(success)}</p>}
			{error && <p>{showErrorMessage(error)}</p>}

			<div className="register_form-field register_form-field--catform-group">
				{/*  <label>Email :</label> */}
				<input
					type="text"
					placeholder="Category Name.."
					value={name}
					onChange={handleChange("name")}
					required
				/>
			</div>
			<div className="register_form-field register_form-field--catform-content">
				{/* <label>Password :</label> */}
				<textarea
					placeholder="Content.."
					value={content}
					onChange={handleChange("content")}
					required
				/>
			</div>
			<div className="register_form-field register_form-field--catform-image">
				{/* <label>Password :</label> */}
				<label>
					{imageUploadText}{" "}
					<input
						type="file"
						accept="image/*"
						onChange={handleChange("image")}
						required
						hidden
					/>
				</label>
			</div>
			<div className="register_form-field register_form-field--button">
				<input type="submit" value={buttonText} />
			</div>
		</form>
	);
	return (
		<Layout>
			<div className={style.admindash_create}>{createCategoryForm()}</div>
		</Layout>
	);
};

export default withAdmin(Create);
