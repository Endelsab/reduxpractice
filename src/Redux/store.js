import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./useSlice";


const store = configureStore({
	reducer: {
		data: dataReducer,
	},
	
});

export default store;
