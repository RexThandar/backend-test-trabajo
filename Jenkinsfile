pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'nexus-repo/backend-test-trabajo'
        KUBE_CONFIG_PATH = 'kube-config.yaml'
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Tests Unitarios') {
            steps {
                sh 'npm run test:ci'
            }
        }

        stage('Analasis de Codigo') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Verificar Gate de Calidad') {
            steps {
                script {
                    timeout(time: 1, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} ."
            }
        }

        stage('Push a Nexus') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'nexus-credentials', usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')]) {
                    sh "docker login -u $NEXUS_USER -p $NEXUS_PASS nexus-repo"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                    sh "docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}"
                }
            }
        }

        stage('Deploy a Kubernetes') {
            steps {
                sh "kubectl apply -f kubernetes.yaml"
            }
        }
    }
}
