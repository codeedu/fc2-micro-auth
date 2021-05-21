const fs = require("fs");
const fsExtra = require('fs-extra');
const path = require('path');
const paths = require("../config/paths");

module.exports = () => {
    const themesDir = fs.readdirSync(paths.appBuild);
    for(const themeDir of themesDir){
    const jsDir = path.join(paths.appBuild, themeDir, 'js');
    if(fs.existsSync(jsDir)){
      fsExtra.copySync(
        path.join(jsDir),
        path.join(paths.appBuild, themeDir, 'common', 'resources', 'js')
      )
    }

    const cssDir = path.join(paths.appBuild, themeDir, 'css');
    if(fs.existsSync(cssDir)){
      fsExtra.copySync(
        path.join(cssDir),
        path.join(paths.appBuild, themeDir, 'common', 'resources', 'css')
      )
    }
  }
}