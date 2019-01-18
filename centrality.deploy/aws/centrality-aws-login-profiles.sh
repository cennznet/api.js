#!/bin/bash
###
# Creare awscli config and credential file 
###


set -e

declare REGION="${AWS_REGION:-"ap-southeast-1"}"

: "${AWS_ACCESS_KEY:?AWS_ACCESS_KEY is required}"
: "${AWS_SECRET_KEY:?AWS_SECRET_KEY is required}"

rm -rf ~/.aws
mkdir ~/.aws

#Note: below is needed for the serverless as it looks --aws-profile looks into credentials
#Yet another serverless bug
cat > ~/.aws/credentials <<- EOF
[default]
aws_access_key_id = ${AWS_ACCESS_KEY}
aws_secret_access_key = ${AWS_SECRET_KEY}

[dev]
source_profile = default
role_arn = arn:aws:iam::225301848476:role/OrganizationAccountAccessRoleTerraform

[uat]
source_profile = default
role_arn = arn:aws:iam::921717751722:role/OrganizationAccountAccessRoleTerraform

[prod]
source_profile = default
role_arn = arn:aws:iam::646191256146:role/OrganizationAccountAccessRoleTerraform

[prod-tokyo]
source_profile = default
role_arn = arn:aws:iam::602152061520:role/OrganizationAccountAccessRoleTerraform
EOF

cat > ~/.aws/config <<- EOF
[profile default]
region = ${REGION}
output = json

[profile dev]
source_profile = default
role_arn = arn:aws:iam::225301848476:role/OrganizationAccountAccessRoleTerraform

[profile uat]
source_profile = default
role_arn = arn:aws:iam::921717751722:role/OrganizationAccountAccessRoleTerraform

[profile prod]
source_profile = default
role_arn = arn:aws:iam::646191256146:role/OrganizationAccountAccessRoleTerraform

[profile prod-tokyo]
region = ap-northeast-1
source_profile = default
role_arn = arn:aws:iam::602152061520:role/OrganizationAccountAccessRoleTerraform

[profile shared]
source_profile = default
role_arn = arn:aws:iam::336918895422:role/OrganizationAccountAccessRoleTerraform
EOF
