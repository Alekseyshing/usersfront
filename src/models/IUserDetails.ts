export interface IUserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: string;
  like?: boolean;
  avatar?: string;
}