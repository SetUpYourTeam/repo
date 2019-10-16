if [ $PRETTY_NAME = "DisplaxSoftware" ]
then
    export FILE_PATH="$(pwd)/$PROJECT/packages_$DISTRIBUTION"
    export SOFTWARE_VERSION="$(sed -n -e '/DisplaxInstaller VERSION / s/.*\  *//p' SkinServiceAppsInstaller/CMakeLists.txt)"
elif [ $PRETTY_NAME = "DisplaxConnect" ] && [ $ARCH_FOLDER = "android" ]
then
    export FILE_PATH="$(pwd)/$PROJECT/android-build/build/outputs/apk/release"
    export SOFTWARE_VERSION="$(sed -n -e '/VERSION =/ s/.*\  *//p' displax-connect/displax-connect.pro)"
elif [ $PRETTY_NAME = "DisplaxConnect" ]
then
    export FILE_PATH="$(pwd)/$PROJECT/installer/$ARCH_FOLDER"
    export SOFTWARE_VERSION="$(sed -n -e '/VERSION =/ s/.*\  *//p' displax-connect/QtInstallerFramework/Installer.pro)"
elif [ $PRETTY_NAME = "DisplaxProgrammer" ]
then
    export FILE_PATH="$(pwd)/$PROJECT/ProgrammerRelease"
    export SOFTWARE_VERSION=$(sed -n -e '/VERSION =/ s/.*\  *//p' programmer/ProgrammerInstaller/ProgrammerInstaller.pro)
fi

npm --prefix deploy-script/ install deploy-script/
node ./deploy-script/app.js
