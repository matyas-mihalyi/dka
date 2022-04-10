import {browser} from '$app/env'
import {session} from '$app/stores'
import {derived} from 'svelte/store'

export const theme = derived(
	session,
	($session, set) => {
		if ($session.theme) {
			set($session.theme)
		} else if (browser) {
			set(
				window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
			)
		}
	}
)

export const setTheme = (theme) => {
	session.update(($session) => ({...$session, theme}))
	fetch('/theme', {method: 'PUT', body: theme})
}