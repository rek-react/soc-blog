import userService from "../service/user.js";
import { getCookieOptions } from "../utils/getCookieOptions.js";

class UserController {
  async update(req, res, next) {
    try {
      const { fullName, email, image: imageUrl } = req.body;
      const image = req.file || imageUrl;
      const user = await userService.update(req.userId, {
        email,
        fullName,
        image,
      });
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const { refreshToken: newRefreshToken, ...user } =
        await userService.refresh(refreshToken);
      res.cookie("refreshToken", newRefreshToken, getCookieOptions());
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const { link } = req.params;
      await userService.activate(link);
      return res.redirect(process.env.CLIENT_URI);
    } catch (e) {
      next(e);
    }
  }
  async getMe(req, res, next) {
    try {
      const userId = req.userId;
      const user = await userService.getMe(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}
export default new UserController();
