pipeline {
    // agent label
    agent { label 'backend_ci' }

    // environment variables 
    // these global variables can be accessed in all stages
    environment {
        PROJECT_NAME = 'calc'
        COMPONENT_NAME = 'backend'
        APP_VERSION = ''
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
        stage("Install Dependencies") {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
    }
}
}