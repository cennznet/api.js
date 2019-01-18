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

jsonval() {
    temp=$(echo "$json" | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w "$prop")
    echo "${temp##*|}"|sed -e 's,     Id:,,g'|sed -e 's/^[[:space:]]*//g'
}

printf "\\n\\n%s\\n\\n" "===================== Creating Invalidation for distribution ${DISTRIBUTION_ID}========================="; 
json=$(aws cloudfront create-invalidation --paths /\* --distribution-id "${DISTRIBUTION_ID}" )
printf "\\n\\n%s\\n\\n" "$json";

prop='Id'
ID=$(jsonval "$json")

printf "\\n\\n%s\\n\\n" "===================== Invalidation successfully created with ID ${ID} ======================"; 
printf "\\n\\n%s\\n\\n" "===================== Please wait for a while for invalidation to be completed =====================";  

out=$(aws cloudfront wait invalidation-completed --distribution-id "${DISTRIBUTION_ID}" --id "${ID}"); 

printf "\\n%s\\n" "$out";
printf "\\n%s\\n" "===================== Done..Invalidation is now completed. =========================================";
