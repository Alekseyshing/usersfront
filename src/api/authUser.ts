import api from './axiosUser'

export class AuthUser {
  static async registration(username: string, email: string, password: string) {
    try {
      const result = await api.post('/api/users', { username, email, password });

      if (result.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  static async login(email: string, password: string) {
    try {
      const result = await api.post('/api/login', { email, password });

      if (result.status === 200) {
        localStorage.setItem('token', JSON.stringify(result.data));
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }
}