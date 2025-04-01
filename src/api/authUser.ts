import api from './api'

export class AuthUser {
  static async registration(firstName: string, lastName: string, email: string, password: string) {
    try {
      console.log('Attempting registration with:', { firstName, lastName, email });
      const result = await api.post('/register', {
        firstName,
        lastName,
        email,
        password
      });
      console.log('Registration response:', result.data);

      if (result.status === 201) {
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Registration error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  }

  static async login(email: string, password: string) {
    try {
      console.log('Attempting login with:', { email });
      const result = await api.post('/login', {
        email,
        password
      });
      console.log('Login response:', result.data);

      if (result.status === 200) {
        localStorage.setItem('token', JSON.stringify(result.data));
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  }
}