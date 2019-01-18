# Deploy 

This repository will contain scripts to perform:

* app deploymets to Kubernetes.
* publishing docker images to private docker registry
* etc...

To use any of these include this repository as submodule to your project using following command `git submodule add git@bitbucket.org:centralitydev/centrality.deploy.git`

## Deploy App to K8s

Add Deployment step to your Jenkinsfile.

```
stage('Dev Deploy') {
  environment {
    TENANT = 'ea23b9ad-a3ca-4936-8613-68446bd85dde'
    SERVICE_PRINCIPAL = credentials('SERVICE_PRINCIPAL')
    SUBSCRIPTION_ID = '93a8e567-e173-4154-93fc-5b60248c8706'
    KUBERNETES_KEY = credentials('kubernetes-rsa')
    CLUSTER_URL = 'https://centrality-dev-master-0.australiasoutheast.cloudapp.azure.com'
    ENV = 'dev'
  }
  steps {
    sh './centrality.deploy/deploy.sh'
  }
}

```
To deploy to different environments use appropriate subscription ids and change Env variable.
Other variables can stay the same.


## Publish image to private docker registry ##

Add Publish step to your jenkins file.

```
stage('Publish Image') {
  environment {
    SERVICE_NAME = 'petrolpump'
    ACR = credentials('AzureDockerRegistry')
  }
  steps {
    sh './centrality.deploy/publish.sh'
  }
}
```

## CloudFront invalidation ##

Add CloudFront invalidation step to your jenkins file if required.

Change cloudfront distribution ID ( DISTRIBUTION_ID )

```
stage('CloudFront Invalidation') {
  environment {
    DISTRIBUTION_ID =  credentials('DISTRIBUTION_ID')
    AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    AWS_DEFAULT_REGION = credentials('AWS_DEFAULT_REGION')
  }
  steps {
    sh './centrality.deploy/aws/pre-invalidate.sh'
  }
}
```

