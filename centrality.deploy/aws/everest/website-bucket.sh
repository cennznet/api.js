#!/bin/bash
###
# This script will copy files to S3 bucket to there respective enviornment	
###

set -e

declare DEFAULT_DOMAIN
declare REGION="${AWS_REGION:-"ap-southeast-1"}"
#export AWS_PROFILE="${ENV}"

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
output = json
source_profile = default
role_arn = arn:aws:iam::710426149098:role/OrganizationAccountAccessRoleTerraform

[profile uat]
output = json
source_profile = default
role_arn = arn:aws:iam::532485325768:role/OrganizationAccountAccessRoleTerraform

[profile prod]
output = json
source_profile = default
role_arn = arn:aws:iam::901020165465:role/OrganizationAccountAccessRoleTerraform

[profile shared]
region = ap-southeast-1
output = json
source_profile = default
role_arn = arn:aws:iam::264739579343:role/OrganizationAccountAccessRoleTerraform
EOF

case "${ENV}" in
    "dev"*)
    DEFAULT_DOMAIN="4everest.me"
    aws_profile="dev"
    build_path="dev"
    ;;
    "uat"*)
    DEFAULT_DOMAIN="4everest.money"
    aws_profile="uat"
    build_path="uat"
    ;;
    "prod"*)
    DEFAULT_DOMAIN="4everest.me"
    aws_profile="prod"
    build_path="prod"
    ;;
esac

declare DOMAIN=${CUSTOM_DOMAIN:-${DEFAULT_DOMAIN}}
declare URL="s3://${SUBDOMAIN}.${DOMAIN}"

aws s3 sync "/opt/code/build/${build_path}" "${URL}" --acl bucket-owner-full-control --acl public-read --profile ${aws_profile}

rm -rf "/opt/code/build/${build_path}"
