FROM node:10.13.0
WORKDIR /workdir
ARG GEMFURY_TOKEN

ENV npm_config_registry="https://npm-proxy.fury.io/${GEMFURY_TOKEN}/centrality/"

COPY lerna.json package.json yarn.lock tslint.json .prettierignore .prettierrc ./

RUN npm install -g yarn
RUN yarn install -q

# install dependecies for packages
COPY ./packages/api/package.json ./packages/api/
COPY ./packages/util/package.json ./packages/util/
COPY ./packages/types/package.json ./packages/types/
COPY ./packages/wallet/package.json ./packages/wallet/
RUN npx lerna bootstrap

# copy source code
COPY . .

# build
#RUN npx lerna run build
RUN yarn build
