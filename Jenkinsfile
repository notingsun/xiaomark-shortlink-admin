pipeline {
    agent none
    stages {
        stage('Build & Deploy') {
            agent {
                docker {
                    image 'lvyaoo/node:11'
                }
            }
            when {
                beforeAgent true
                anyOf {
                    branch 'stage'
                    branch 'production'
                }
            }
            environment {
                TARGET = "${WWW_ROOT_DIR}/${env.JOB_NAME}"
            }
            steps {
                sh "npm install"
                sh "npm run ${env.BRANCH_NAME}-build"
                sh "mkdir -p ${TARGET} && rm -r ${TARGET} && cp -r dist/ ${TARGET}"
            }
            post {
                always {
                    mail to: "${LJ_EMAIL}",
                         subject: "[${currentBuild.currentResult}] CI: ${currentBuild.fullDisplayName}",
                         body: """Project: ${env.JOB_NAME}<br>
                                  Build Number: ${env.BUILD_NUMBER}<br>
                                  Build Result: ${currentBuild.currentResult}<br>
                                  Duration: ${currentBuild.durationString}<br>
                                  Git Commit: ${env.GIT_COMMIT}<br><br>
                                  Check console output at ${env.BUILD_URL} to view the results.""",
                         mimeType: "text/html"
                }
            }
        }
    }
}
