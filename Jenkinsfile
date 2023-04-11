pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'HW3', url: 'https://github.com/Son1cPower/AutomatedTestingMentoring_Advanced_JS.git'
            }
        }
        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv(installationName: 'sq1') {
                    sh "sonar-scanner-4.6.2.2472-linux/bin/sonar-scanner"
                }
            }
        }
    }
}
