pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                sh '''
                    node --version
                    npm --version
                    node -e "const [major, minor] = process.versions.node.split('.').map(Number); const supported = (major === 20 && minor >= 19) || (major >= 22 && (major > 22 || minor >= 12)); if (!supported) { console.error('Node.js 20.19+ or 22.12+ is required by Vite.'); process.exit(1); }"
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Backend') {
                    sh 'npm ci --no-audit --no-fund'
                }
                dir('Frontend') {
                    sh 'npm ci --no-audit --no-fund'
                }
            }
        }

        stage('Lint') {
            steps {
                dir('Backend') {
                    sh 'npm run lint'
                }
                dir('Frontend') {
                    sh 'npm run lint'
                }
            }
        }

        stage('Test') {
            steps {
                dir('Backend') {
                    sh 'npm test -- --ci --runInBand'
                }
                dir('Frontend') {
                    sh 'npm test -- --ci --runInBand'
                }
            }
        }

        stage('Build') {
            steps {
                dir('Backend') {
                    sh 'npm run build'
                }
                dir('Frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Archive Frontend Build') {
            steps {
                archiveArtifacts artifacts: 'Frontend/dist/**', fingerprint: true
            }
        }
    }
}