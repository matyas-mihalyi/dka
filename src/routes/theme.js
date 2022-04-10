
// PUT /theme
export const put = async ({request}) => {
	const theme = await request.text()

	if (!theme) {
		return {
			status: 400,
			body: `not a valid theme value: ${theme}`,
		}
	}

	return {
		headers: {
			'Set-Cookie': `theme=${theme}; SameSite=Strict; HttpOnly; Path=/`,
		},
	}
}

// DELETE /theme
export const del = async () => ({
	status: 204,
	headers: {
		'Set-Cookie': `theme= ; Max-Age=0; SameSite=Strict; HttpOnly; Path=/`,
	},
})