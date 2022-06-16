import jwt_decode from 'jwt-decode';

export function respond(body) {
	if (body.non_field_errors) {
		return { status: 400, body: { status: 400 } };
	}

	const access_token = JSON.stringify(body.access_token);
	const access_decoded = jwt_decode(access_token);

	const refresh_token = JSON.stringify(body.refresh_token);
	const refresh_decoded = jwt_decode(refresh_token);

	const user = JSON.stringify(body.user);
	const value = Buffer.from(user).toString('base64');

	if (body.user && (body.user.account_type === 1 || body.user.account_type === 2)) {
		return {
			status: 401,
			body: {
				status: 401
			}
		};
	}

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'set-cookie': [
				`access=${access_token}; Path=/; Expires=${new Date(access_decoded.exp * 1000)}; HttpOnly`,
				`refresh=${refresh_token}; Path=/; Expires=${new Date(
					refresh_decoded.exp * 1000
				)}; HttpOnly`,
				`user=${value}; Path=/; Expires=${new Date(refresh_decoded.exp * 1000)}; HttpOnly`
			]
		},
		body
	};
}
