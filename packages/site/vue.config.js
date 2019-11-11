const isDev = process.env.NODE_ENV === "development";
const isGitpod = !!process.env.GITPOD_REPO_ROOT;

module.exports = {
  lintOnSave: false,
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },
  transpileDependencies: ["vuetify"],
  devServer: {
    disableHostCheck: isDev && isGitpod,
  },
};
