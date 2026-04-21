pipeline {
    // agent label
    agent { label 'backend_ci' }

    // environment variables 
    // these global variables can be accessed in all stages
    environment {
        PROJECT_NAME = 'calc'
        COMPONENT_NAME = 'backend'
        APP_VERSION = ''
        ACCOUNT_ID = '890742589086'
    }
    // stages
    stages {
        // read version from package.json and set it to env.APP_VERSION
        stage("Read Version") {
            steps {
                script {
                    def packageJson = readJSON file: 'package.json'
                    APP_VERSION = packageJson.version
                    echo "App Version: ${APP_VERSION}"
                }
            }
        }
        // install dependencies
        stage("Install Dependencies") {
            steps {
                script {
                    sh """npm install"""
                }
            }
        }
        // build docker image
        stage("Build Docker Image"){
            steps {
                script {
                    // docker image tag format: project_component:version
                    sh "docker build -t ${PROJECT_NAME}_${COMPONENT_NAME}:${APP_VERSION} ."
                }
            }
        }
        // push docker image to ECR
        stage("Push Docker Image to ECR"){
            steps {
                script {
                   withAWS(region: 'us-east-1', credentials:'aws-creds') {
                    // Login to ECR
                    sh """
                    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com
                    // push docker image to ECR
                    docker push "${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${PROJECT_NAME}_${COMPONENT_NAME}:${APP_VERSION}
        """
                }
                }
            }
        }
    }
}
