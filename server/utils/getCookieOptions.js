export const getCookieOptions = () => {
  return {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };
};
