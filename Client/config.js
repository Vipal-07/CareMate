export const BASE_URL='http://localhost:5000/api/v1'

// Previously we used a JWT stored in localStorage. The app now uses server-side
// sessions (express-session + cookies). To call authenticated endpoints from the
// browser, include credentials in fetch: { credentials: 'include' }.

// helper hint for developers: fetch with session
// fetch(`${BASE_URL}/some/protected`, { method: 'GET', credentials: 'include' })