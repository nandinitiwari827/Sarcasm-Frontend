export const isLoggedIn = () => {
  const token = localStorage.getItem("accessToken")
  const user = localStorage.getItem("user")
  return Boolean(token && user)
}
