import { createSlice } from '@reduxjs/toolkit';
import { original } from 'immer';

import { addKeyValues, addQueryParamsToUrl, addHeaders } from './proxy-options';

export const initialState = {
	loading: false,
	finished: false,
	response: {},
	errors: null
};

const proxySlice = createSlice({
	name: 'proxy',
	initialState,
	reducers: {
		proxyLoading: (state) => {
			state.loading = true;
		},
		proxySuccess: (state, { payload }) => {
			const oldState = original(state.response);
			const newData = (oldState && oldState.data) ? [...oldState.data, ...payload.data] : payload.data;

			state.finished = payload.data && payload.data.length === 0;
			state.loading = false;
			state.response = {
				...payload,
				data: newData
			};
			state.errors = null;
		},
		proxyFailure: (state, { payload }) => {
			state.loading = false;
			state.finished = true;
			state.response = {};
			state.errors = payload;
		},
		proxyReset: () => initialState
	}
});

export const { proxyLoading, proxySuccess, proxyFailure, proxyReset } = proxySlice.actions;

export const proxySelector = (state) => state['proxy'];

export default proxySlice.reducer;


export const fetchApi = (api, payload) => {
	return async (dispatch) => {
		dispatch(proxyLoading());

		let url = api;
		if (payload['queryParams']) {
			url = `${addQueryParamsToUrl(url, payload['queryParams'])}`;
		}

		if (payload['keyValues']) {
			url = `${addKeyValues(url, payload['keyValues'])}`;
		}

		try {
			const response = await fetch(url, addHeaders());
			const res = await response.json();

			if (res['status'] !== 200) {
				throw res;
			}

			dispatch(proxySuccess(res));
		} catch (error) {
			dispatch(proxyFailure(error));
		}
	};
};
