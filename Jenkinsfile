pipeline {
    agent any
    
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'cmd /c "npm install"'
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Mocha Tests') {
                    steps {
                        bat 'cmd /c "npm run wdio:mocha"'
                    }
                }
                
                stage('Cucumber Tests') {
                    steps {
                        bat 'cmd /c "npm run wdio:cucumber"'
                    }
                }
                
                stage('API Tests') {
                    steps {
                        bat 'cmd /c "npm run api"'
                    }
                }
            }
        }
    }
}
