pipeline {
    agent any
    environment {
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-25.0.3'
        PATH = "${JAVA_HOME}\\bin;${env.PATH}"
    }
    options {
        timestamps()
        disableConcurrentBuilds()
    }
    triggers {
        // Also configure GitHub webhook trigger in the Jenkins job UI.
        githubPush()
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Backend - Test & Package') {
            steps {
                dir('backend') {
                    sh 'mvn -B clean test package'
                }
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'backend/target/surefire-reports/*.xml'
                }
            }
        }
        stage('Frontend - Install') {
            steps {
                dir('frontend') {
                    sh 'npm install --no-audit --no-fund'
                }
            }
        }
        stage('Frontend - Lint') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }
        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    sh 'NEXT_PUBLIC_API_URL=http://localhost:8080 npm run build'
                }
            }
        }
    }
    post {
        success { echo 'QuickBite CI passed: backend tests/package and frontend lint/build.' }
        failure { echo 'CI failed. Inspect the first failed stage and console output.' }
    }
}
