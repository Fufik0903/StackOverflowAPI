import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./posts/postsSlice";

export const store = configureStore({
	reducer: {
		posts: postsSlice,
	},
	devTools: true,
});
