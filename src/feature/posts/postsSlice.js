import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	pageContent,
	postComments,
	searchPosts,
} from "../../components/API/API";

export const getPosts = createAsyncThunk(
	"posts/getPosts",
	async (params, thunkApi) => {
		try {
			const res = await searchPosts(params);
			return { list: res.data.items, params };
		} catch (err) {
			console.log(err);
			return thunkApi.rejectWithValue(err);
		}
	}
);
export const getPost = createAsyncThunk("posts", async (params, thunkApi) => {
	try {
		const res = await pageContent(params);
		const comments = await postComments(params);
		return {
			post: res.data.items[0],
			params,
			comments: comments.data.items,
		};
	} catch (err) {
		console.log(err);
		return thunkApi.rejectWithValue(err);
	}
});

const postsSlice = createSlice({
	name: "posts",
	initialState: {
		post: {},
		comments: [],
		list: [],
		params: {
			value: "",
			filters: {
				orderBy: "desc",
				sortValue: "activity",
			},
		},
		page: 1,
		isLoading: false,
	},
	reducers: {
		pageCounter: (state, { payload }) => {
			state.page = payload;
		},
		refreshSearch: (state, { payload }) => {
			state.list = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getPosts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getPost.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getPosts.fulfilled, (state, { payload }) => {
			state.list = state.list.concat(payload.list);
			state.params = payload.params;
			state.isLoading = false;
		});
		builder.addCase(getPost.fulfilled, (state, { payload }) => {
			state.post = { ...payload.post };
			state.comments = [...payload.comments];
			state.isLoading = false;
		});
	},
});
export const { pageCounter, refreshSearch } = postsSlice.actions;
export default postsSlice.reducer;
