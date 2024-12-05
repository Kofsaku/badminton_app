import { ProfileModel } from './ProfileModel';

export const UserModel = () => ({
  email: '',
  full_name: '',
  password: '',
  profile_attributes: ProfileModel(),
});