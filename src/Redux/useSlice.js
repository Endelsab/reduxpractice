import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// Define an initial state for your slice
const initialState = {
	data: [],
	status: "idle",
	error: null,
};

//for fetching data
export const fetchData = createAsyncThunk("fetchStudentData", async () => {
	const response = await fetch("http://localhost:9000/student");
	const studentData = await response.json();
	return studentData;
});

//delete data
export const deleteStudent = createAsyncThunk(
	"deleteStudent",
	async (id, { rejectWithValue }) => {
		const response = await fetch(`http://localhost:9000/student/delete/${id}`, {
			method: "DELETE",
		});

		try {
			const result = await response.json();
			console.log(result);
			return result;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

//add data
export const addStudent = createAsyncThunk(
	"addStudent",
	async (data, { rejectWithValue }) => {
		const response = await fetch("http://localhost:9000/student/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		try {
			const result = await response.json();
			return result;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

//Edit student
//update action

export const updateStudent = createAsyncThunk(

  'updateStudent',
  async ( id, updatedData ) => {
     console.log(id,updatedData)
    const response = await axios.put(`http://localhost:9000/student/update/${id}`, updatedData);
    return response.data;
  }
);

// Create a slice
const dataSlice = createSlice({
	name: "StudentData",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.data = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});

		//add student Stats
		addStudent(addStudent.pending, (state) => {
			state.status = "loading";
		});
		addStudent(addStudent.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.data = action.payload;
		});
		addStudent(addStudent.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});

		deleteStudent(deleteStudent.pending),
			(state) => {
				state.status = "loading...";
			},
			deleteStudent(deleteStudent.fulfilled),
			(state, action) => {
				state.status = "succeeded";
				const { id } = action.payload;
				if (id) {
					state.data = state.data.filter((student) => student.id !== id);
				}
			},
			deleteStudent(deleteStudent.rejected),
			(state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			};

      updateStudent(updateStudent.pending, (state) => {
        state.status = 'loading';
      })
      updateStudent(updateStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state with the new data
        // You might need to map through your data and update the specific item
        state.data = state.data.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      updateStudent(updateStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  
	},
});

// Export the async thunk to be used in components

// Export the reducer to be used in the store
export default dataSlice.reducer;
