import React from "react";
import StudentList from "./components/StudentList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Update from "./components/Update";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<StudentList />} />
					<Route path="/add" element={<Add />} />
					<Route path="/update/:id" element={<Update />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
