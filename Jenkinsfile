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
        // build and push docker image to ECR
        stage("Build and Push Docker Image to ECR"){
            steps {
                script {
                   withAWS(region: 'us-east-1', credentials:'aws-creds') {
                    sh """
                    docker build -t ${PROJECT_NAME}/${COMPONENT_NAME}:${APP_VERSION} .
                    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com
                    docker tag ${PROJECT_NAME}/${COMPONENT_NAME}:${APP_VERSION} ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${PROJECT_NAME}/${COMPONENT_NAME}:${APP_VERSION}
                    docker push ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${PROJECT_NAME}/${COMPONENT_NAME}:${APP_VERSION}
                    """
                }
                }
            }
        }
    }
}
