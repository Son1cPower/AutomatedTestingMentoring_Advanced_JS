pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                bat label: '', script: 'npm install'
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Mocha Tests') {
                    steps {
                        bat label: '', script: 'npm run wdio:mocha'
                    }
                }
                
                stage('Cucumber Tests') {
                    steps {
                        bat label: '', script: 'npm run wdio:cucumber'
                    }
                }
                
                stage('API Tests') {
                    steps {
                        bat label: '', script: 'npm run api'
                    }
                }
            }
        }
    }
}