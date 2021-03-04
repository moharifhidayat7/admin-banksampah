module.exports = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/Auth/Login",
      },
      {
        source: "/Dashboard",
        destination: "/Dashboard/Dashboard",
      },
    ];
  },
};
