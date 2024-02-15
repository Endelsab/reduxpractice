import React, { useState } from "react";
import { addStudent } from "../Redux/useSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Add = () => {
	const [student, setStudent] = useState({
		Firstname: "",
		Lastname: "",
		Program: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setStudent((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleAdd = () => {
		dispatch(addStudent(student));
		navigate("/");
	};

	return (
		<>
			<div className="row mb-3">
				<label
					for="colFormLabelSm"
					className="col-sm-2 col-form-label col-form-label-sm">
					Firstname
				</label>
				<div className="col-sm-10">
					<input
						type="email"
						className="form-control form-control-sm"
						id="colFormLabelSm"
						name="Firstname"
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="row mb-3">
				<label for="colFormLabel" className="col-sm-2 col-form-label">
					Lastname
				</label>
				<div className="col-sm-10">
					<input
						type="email"
						className="form-control"
						id="colFormLabel"
						name="Lastname"
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="row">
				<label
					for="colFormLabelLg"
					className="col-sm-2 col-form-label col-form-label-lg">
					Program
				</label>
				<div className="col-sm-10">
					<input
						type="email"
						className="form-control form-control-lg"
						id="colFormLabelLg"
						name="Program"
						onChange={handleChange}
					/>
				</div>
			</div>
			<button onClick={handleAdd} className="btn btn-success">
				Add
			</button>
		</>
	);
};

export default Add;
