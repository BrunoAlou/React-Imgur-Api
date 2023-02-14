import ENV from './environment';

// Dados API imgur
export const AppOptions = {
	IMGUR: {
		CLIENT_NAME: 'teste',
		CLIENT_ID: '4a6c605912fa4a5'
	}
};

export const AppServices = {
	GALLERY: {
		FETCH: {
			URL: `${ENV().REST_API}/gallery/{section}/{sort}/{window}/{page}`
		}
	}
};

export const RequestHeaders = {
	get: {
		authorization: `Client-ID ${AppOptions.IMGUR.CLIENT_ID}`
	},
	post: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
};
