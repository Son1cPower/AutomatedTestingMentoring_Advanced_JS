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
                    sh "sonar-scanner -Dsonar.host.url=http://localhost:9001"
                }
            }
        }
    }
}
