pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Mocha Tests') {
                    steps {
                        bat 'npm run wdio:mocha'
                    }
                }
                
                stage('Cucumber Tests') {
                    steps {
                        bat 'npm run wdio:cucumber'
                    }
                }
                
                stage('API Tests') {
                    steps {
                        bat 'npm run api'
                    }
                }
            }
        }
    }
}
