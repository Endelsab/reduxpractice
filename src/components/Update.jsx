import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateStudent } from "../Redux/useSlice";
import { useDispatch, useSelector } from "react-redux";

const Update = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const location = useLocation();
	const studentId = location.pathname.split("/")[2];

	const { data } = useSelector((state) => state.data);

	const [updatedStudent, setUpdatedStudent] = useState({
		Firstname: "",
		Lastname: "",
		Program: "",
	});

	useEffect(()=>{
            
				
				
				setUpdatedStudent(data)
			  
	},[])



	const handleChange = (e) => {
		setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
	};

	const handleSave = (e) => {
		e.preventDefault();
		dispatch(updateStudent(studentId, updatedStudent));
		navigate("/");
	};

	return (
		<>
			<div className="row mb-3">
				<label className="col-sm-2 col-form-label col-form-label-sm">
					Firstname
				</label>
				<div className="col-sm-10">
					<input
						className="form-control form-control-sm"
						type="text"
						id="colFormLabelSm"
						onChange={handleChange}
						
						
						name="Firstname"
					/>
				</div>
			</div>
			<div className="row mb-3">
				<label className="col-sm-2 col-form-label">Lastname</label>
				<div className="col-sm-10">
					<input
						type="text"
						className="form-control"
						id="colFormLabel"
						onChange={handleChange}
						name="Lastname"
					/>
				</div>
			</div>
			<div className="row">
				<label className="col-sm-2 col-form-label col-form-label-lg">
					Program
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						className="form-control form-control-lg"
						id="colFormLabelLg"
						onChange={handleChange}
						name="Program"
					/>
				</div>
			</div>
			<button onClick={handleSave} className="btn btn-success">
				save
			</button>
		</>
	);
};

export default Update;
