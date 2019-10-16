export FILE_PATH="$(pwd)/$PROJECT/installer/$ARCH_FOLDER"
export SOFTWARE_VERSION="$(sed -n -e '/VERSION =/ s/.*\  *//p' displax-connect/QtInstallerFramework/Installer.pro)"

npm --prefix deploy-script/ install deploy-script/
node ./deploy-script/app.js
