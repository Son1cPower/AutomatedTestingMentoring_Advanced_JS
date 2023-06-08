pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Mocha Tests') {
                    steps {
                        sh 'npm run wdio:mocha'
                    }
                }
                
                stage('Cucumber Tests') {
                    steps {
                        sh 'npm run wdio:cucumber'
                    }
                }
                
                stage('API Tests') {
                    steps {
                        sh 'npm run wdio:api'
                    }
                }
            }
        }
    }
}
