import * as api from '$lib/api';

export async function post() {
	const res = await api.post('auth/logout/');
	return {
		headers: {
			'set-cookie': [
				`access=deleted; Path=/; Max-Age=-1; HttpOnly`,
				`refresh=deleted; Path=/; Max-Age=-1; HttpOnly`,
				`user=deleted; Path=/; Max-Age=-1; HttpOnly`
			]
		},

		body: {
			ok: true
		}
	};
}
