pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                npm install
            }
        }
          stage('Test 1') {
            steps {
                npm run wdio:mocha
            }
        }
        stage('Test 2') {
            steps {
                npm run wdio:cucumber
            }
        }
        stage('Test 3') {
            steps {
                npm run wdio:api
            }
        }
    }
}
