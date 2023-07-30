import authService from "../service/auth.js";
import { getCookieOptions } from "../utils/getCookieOptions.js";

class AuthController {
  
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      const { refreshToken, ...user } = await authService.login(
        login,
        password
      );
      res.cookie("refreshToken", refreshToken, getCookieOptions());
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;
      const { refreshToken, ...user } = await authService.register(
        email,
        fullName,
        password
      );
      res.cookie("refreshToken", refreshToken, getCookieOptions());
      return res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}
export default new AuthController();
