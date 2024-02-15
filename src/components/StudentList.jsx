import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteStudent } from "../Redux/useSlice";
import { useEffect } from "react";

const StudentList = () => {
	const dispatch = useDispatch();

	const students = useSelector((state) => state.data.data);
	const status = useSelector((state) => state.data.status);

	useEffect(() => {
		dispatch(fetchData());
	}, [dispatch]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "failed") {
		return <div>Error: Unable to fetch students</div>;
	}

	//delete
	const handleDelete = (id) => {
		dispatch(deleteStudent(id));
		window.location.reload();
	};
	

	return (
		<>
			<div className="container">
				<table className="table ">
					<thead>
						<tr>
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Program</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student) => (
							<tr key={student.dbID}>
								<td>{student.Firstname}</td>
								<td>{student.Lastname}</td>
								<td>{student.Program}</td>
								<td>
									<button className="btn btn-warning">
										<Link to={`/update/${student.dbID}`} >edit</Link>
									</button>
									<button
										onClick={() => handleDelete(student.dbID)}
										className="btn btn-danger">
										delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<button className="btn btn-primary hover:text-white">
				<Link to="/add">Add new student</Link>
			</button>
		</>
	);
};

export default StudentList;
