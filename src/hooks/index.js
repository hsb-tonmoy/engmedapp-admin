import * as cookie from 'cookie';
import jwt_decode from 'jwt-decode';
import * as api from '$lib/api';

const getJWTExp = (token) => {
	const { exp } = jwt_decode(token);

	return exp;
};

export async function handle({ event, resolve }) {
	let access_token = '';

	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const user = cookies.user && Buffer.from(cookies.user, 'base64').toString('utf-8');
	event.locals.user = user ? JSON.parse(user) : null;
	event.locals.access = cookies.access ? cookies.access : null;

	if (user && !cookies.access) {
		if (!event.request.url.includes('logout')) {
			const { access } = await api.post('auth/token/refresh/', { refresh: cookies.refresh });

			access_token = access;
			event.locals.access = access;
		}
	}
	const response = await resolve(event);

	if (access_token) {
		response.headers.set(
			'set-cookie',
			`access=${access_token}; Path=/; Expires=${new Date(
				getJWTExp(access_token) * 1000
			)}; HttpOnly`
		);
	}

	return response;
}

export function getSession({ locals }) {
	return {
		user: locals.user && {
			id: locals.user.pk,
			username: locals.user.username,
			email: locals.user.email,
			first_name: locals.user.first_name,
			last_name: locals.user.last_name,
			account_type: locals.user.account_type,
			profile_pic: locals.user.profile_pic
		}
	};
}
