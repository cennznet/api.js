#!/bin/bash
###
# This script will create AWS CloudFront Invalidation & wait for invalidation to be completed	
###

# Pre-requisites: 
#
# Following environment variables need to be set
# export AWS_ACCESS_KEY_ID=XXXXXXXXXXXXXXXX
# export AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXXXXX

set -e

/opt/code/centrality.deploy/aws/centrality-aws-login-profiles.sh

: "${DISTRIBUTION_ID:?DISTRIBUTION_ID is required}"
: "${ENV:?ENV is required}"
 
 
declare REGION="${AWS_REGION:-"ap-southeast-1"}"
export AWS_PROFILE="${ENV}"
 
 
printf "\\n\\n%s\\n\\n" "===================== Creating Invalidation for distribution ${DISTRIBUTION_ID}========================="; 
ID=$(aws cloudfront create-invalidation --paths /\* --distribution-id "${DISTRIBUTION_ID}"  --profile ${AWS_PROFILE} |jq -r '.Invalidation.Id') 
 

printf "\\n\\n%s\\n\\n" "===================== Invalidation successfully created with ID ${ID} ======================"; 
printf "\\n\\n%s\\n\\n" "===================== Please wait for a while for invalidation to be completed =====================";  

out=$(aws cloudfront wait invalidation-completed  --profile ${AWS_PROFILE} --distribution-id "${DISTRIBUTION_ID}" --id "${ID}"); 

printf "\\n%s\\n" "$out";
printf "\\n%s\\n" "===================== Done..Invalidation is now completed. =========================================";
