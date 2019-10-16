def ps(psCmd) {
  psCmd=psCmd.replaceAll("%", "%%")
  bat returnStatus: true, script: "powershell.exe -NonInteractive -ExecutionPolicy Bypass -Command \"\$ErrorActionPreference='Stop';[Console]::OutputEncoding=[System.Text.Encoding]::UTF8;$psCmd;EXIT \$global:LastExitCode\""
}
pipeline {
    agent none
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    environment {
        API_TEST_ADDRESS = credentials('API_DEV_ADDRESS')
        API_DEPLOYMENT_ADDRESS = credentials('API_DEPLOYMENT_ADDRESS')
        API_USER = credentials('API_USER')
        API_PASSWORD = credentials('API_PASSWORD')
        BUCKET_NAME = 'portal'
        STORAGE_ACCESS_KEY_ID = credentials('STORAGE_ACCESS_KEY_ID')
        STORAGE_SECRET_ACCESS_KEY = credentials('STORAGE_SECRET_ACCESS_KEY')
        STORAGE_TEST_ADDRESS = credentials('STORAGE_DEV_ADDRESS')
        STORAGE_DEPLOY_ADDRESS = credentials('STORAGE_DEPLOY_ADDRESS')
        ANDROID_KEY_STORE = credentials('ANDROID_KEY_STORE')
    }
    stages {
        stage('SkinService && HostLib && SkinCMD && DC Linux x86') {
            environment {
                QT_INSTALL_LIBS="${$QTDIR}/lib"
                QT_INSTALL_QML="${$QTDIR}/qml"
                QT_INSTALL_PLUGINS="${$QTDIR}/plugins"
                API = "${API_TEST_ADDRESS}"
                ARCH_FOLDER = 'linux'
                ARCHITECTURE = 'linux-ubuntu-x86'
                STORAGE_ADDRESS = "${STORAGE_TEST_ADDRESS}"
                PRETTY_NAME = 'DisplaxConnect'
                FILE_NAME = 'INSTALLER.installer'
                PROJECT = 'displax-connect'
            }
            agent {
                label 'ubuntu-i386-qt'
            }
            steps {
                script{
                    withEnv(['PRETTY_NAME=DisplaxSoftware', 'PROJECT=SkinServiceAppsInstaller', 'DISTRIBUTION=linux']) {
                        sh './deploy.sh';
                    }
                }
            }
        }
    }
}
