module.exports = {
  async rewrites() {
    return [
      {
        source: "/Auth/login",
        destination: "/Auth/Login",
      },
      {
        source: "/Dashboard",
        destination: "/Admin/Dashboard",
      },
    ];
  },
};
