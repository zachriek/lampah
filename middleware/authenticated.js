export default async function ({ store, redirect }) {
  const user = await store.$cookies.get('auth._token.local')
  if (process.client && !store.state.auth.loggedIn && !user) {
    return redirect('/login')
  }
}
