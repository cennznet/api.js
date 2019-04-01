FROM node:10.13.0
WORKDIR /workdir

COPY lerna.json package.json yarn.lock tslint.json .prettierignore .prettierrc CHANGELOG.md ./

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
