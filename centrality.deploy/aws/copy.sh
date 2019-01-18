#!/bin/bash
###
# This script will copy files to S3 bucket to there respective enviornment	
###

set -e

declare DEFAULT_DOMAIN
declare REGION="${AWS_REGION:-"ap-southeast-2"}"
export AWS_PROFILE="${ENV}"

cat > ~/.aws/credentials <<- EOF
[default]
aws_access_key_id = ${AWS_KEY}
aws_secret_access_key = ${AWS_SECRET}
EOF

cat > ~/.aws/config <<- EOF
[profile default]
region = ${REGION}
output = json

[profile dev]
source_profile = default
role_arn = arn:aws:iam::225301848476:role/OrganizationAccountAccessRole

[profile uat]
source_profile = default
role_arn = arn:aws:iam::921717751722:role/OrganizationAccountAccessRole

[profile prod]
source_profile = default
role_arn = arn:aws:iam::646191256146:role/OrganizationAccountAccessRole

[profile prod-tokyo]
region = ap-northeast-1
source_profile = default
role_arn = arn:aws:iam::602152061520:role/OrganizationAccountAccessRole
EOF

case "${ENV}" in
    dev)
        DEFAULT_DOMAIN="centrality.me"
        ;;
    uat)
        DEFAULT_DOMAIN="centrality.cloud"
        ;;
    prod)
        DEFAULT_DOMAIN="centralityapp.com"
        ;;
    prod-tokyo)
        DEFAULT_DOMAIN="tokyo.centralityapp.com"
        ;;
esac

declare DOMAIN=${CUSTOM_DOMAIN:-${DEFAULT_DOMAIN}}
declare URL="s3://${SUBDOMAIN}.${DOMAIN}"

#copy to settings folders
aws s3 cp "/opt/code/settings/${ENV}-${SETTINGS}" "${URL}/config/config.js" --profile "${ENV}"
