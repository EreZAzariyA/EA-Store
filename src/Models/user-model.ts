import Role from "./role";

class UserModel {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      roleId: Role;
}

export default UserModel