pipeline {
  agent none
  options {
    timeout(time: 1, unit: 'HOURS')
  }
  stages {
    stage('Host-tools build'){
      when { 
        expression { params.ENV_TESTS != 'true' } 
      }
      parallel {
        stage('SkinService && HostLib && SkinCMD && DC Linux x86') {
          agent {
              label 'ubuntu-i386-qt'
          }
          steps {
            script{
                sh 'echo 1';
            }
          }
        }
        stage('SkinService && HostLib && SkinCMD && DC Linux x64') {
          agent {
              label 'ubuntu-x64-qt'
          }
          steps {
               sh 'echo 1';
          }
        }
        stage('SkinService && HostLib && SkinCMD && DC Windows x86') {
          agent {
            label "windows-x86-qt"
          }
          steps {
             sh 'echo 1';
          }
        }
        stage('SkinService && HostLib && SkinCMD && DC Windows x64')
          agent {
              label 'windows-x64-qt'
          }
          steps {
             sh 'echo 1';
          }
        }
        stage('SkinService && HostLib && Build Connect MacOS') {
          agent {
            label "osx"
          }
          steps {
              sh 'echo 1';
          }
        }
      }
    }
    stage("Initiate integration tests job"){
      when { 
        expression { params.ENV_TESTS != 'true' } 
      }
      agent {
        label 'linux-tests-machine'
      }
      steps{
        build job: "/repo", wait:false, parameters: [ string(name: 'ENV_TESTS', value: "true")]
      }
    }
    stage('Host-tools build deploy'){
      when { branch 'master' }
      parallel {
        stage('SkinService && HostLib && SkinCMD && DC Linux x86 deploy') {
          agent {
              label 'ubuntu-i386-qt'
          }
          steps {
            sh 'echo 1'
          }
        }
        stage('SkinService && HostLib && SkinCMD && DC Linux x64 deploy') {
          agent {
              label 'ubuntu-x64-qt'
          }
          steps {
            sh 'echo 1'
          }
        }
      }
    }
    stage('Tests'){
      when{
        expression { params.ENV_TESTS == 'true' }
      }
      agent {
        label 'linux-tests-machine'
      }  
      steps {
          script{
            sh 'echo 1'
          }
        }
      }
    }
  }
}
