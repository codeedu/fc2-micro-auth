"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
  throw err;
});

// Ensure environment variables are read.
require("../config/env");

const fs = require("fs");
const chalk = require("react-dev-utils/chalk");
const webpack = require("webpack");
const { createCompiler } = require("../config/WebpackDevServerUtils");
const paths = require("../config/paths");
const configFactory = require("../config/webpack.config");
const makeCommonResources = require("./_make-common-resources");

const useYarn = fs.existsSync(paths.yarnLockFile);


if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(
    `Learn more here: ${chalk.yellow("https://cra.link/advanced-config")}`
  );
  console.log();
}

const config = configFactory("development");
const appName = require(paths.appPackageJson).name;

const useTypeScript = fs.existsSync(paths.appTsConfig);
const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === "true";

// Create a webpack compiler that is configured with custom messages.
createCompiler({
  appName,
  config,
  devSocket: { errors: () => {}, warnings: () => {} },
  urls: {
    localUrlForTerminal: "Only compiled",
  },
  useYarn,
  useTypeScript,
  tscCompileOnError,
  webpack,
}).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  }

  console.log(
    stats.toString({
      assets: false,
      children: false,
      chunks: false,
      colors: true
    })
  );

  if(err){
    return;
  }

  makeCommonResources();
});
