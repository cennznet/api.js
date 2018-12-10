FROM node:10.13.0
WORKDIR /workdir

COPY lerna.json package.json yarn.lock tslint.json .prettierignore .prettierrc ./

RUN npm install -g yarn
RUN yarn install

# install dependecies for packages
COPY ./packages/api-promise/package.json ./packages/api-promise/
COPY ./packages/http-provider/package.json ./packages/http-provider/
COPY ./packages/runtime-types/package.json ./packages/runtime-types/
COPY ./packages/types/package.json ./packages/types/
COPY ./packages/wallet/package.json ./packages/wallet/
RUN npx lerna bootstrap

# copy source code
COPY packages ./packages

