pipeline {
  stages {
    stage {
      parallel {
        stage('Build') {
          steps {
            sh 'ech 1'
          }
        }
        stage('Test') {
          environment {
            CI = 'true'
          }
          steps {
            sh 'echo 2'
          }
        }
        stage('Deliver') {
          steps {
            sh 'echo 3'
          }
        }
      }
    }
  }
  stage {
    parallel {
      stage('Build') {
        steps {
          sh 'ech 1'
        }
      }
      stage('Test') {
        environment {
          CI = 'true'
        }
        steps {
          sh 'echo 2'
        }
      }
      stage('Deliver') {
        steps {
          sh 'echo 3'
        }
      }
    }
  }
}
