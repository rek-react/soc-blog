import userService from "./user.js";

class AuthService {
  async login(login, password) {
    const user = await userService.login(login, password);
    return user;
  }

  async register(email, fullName, password) {
    const user = await userService.create(email, fullName, password);
    return user;
  }
  async logout(refreshToken) {
    const user = await userService.logout(refreshToken);
    return user;
  }
}

export default new AuthService();
