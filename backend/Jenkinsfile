pipeline {
    // agent label
    agent {label 'calc_backend_nodejs_ci_label'}

    // project environment variables
    // these global variables can be accessed in all stages
    environment {
        PROJECT_NAME = 'calc'
        COMPONENT_NAME = 'backend'
        APP_VERSION = ''
    }
    // stages
    stages {
        // read version from package.json and set it to env.APP_VERSION
        stage("Read Version"){
             steps{
                    // this is groovy code, not shell script
                    def packageJson = readJSON file: 'package.json'
                    env.APP_VERSION = packageJson.version
                }
            }
        // Install dependencies
        stage("Install dependencies") {
            steps {
                sh 'npm install'
            }
        }
        // Build the docker image
        stage("Build docker image") {
            steps {
                sh "docker build -t ${PROJECT_NAME}/${COMPONENT_NAME}:${APP_VERSION} ."
            }
        }
        // Push the docker image to ECR
        stage("Push docker image to ECR"){
            steps{

            }
        }
    
}
}