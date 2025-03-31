export default function useToken() {
  const tokenString = localStorage.getItem('token');
  return {
    token: tokenString || ''
  };
}