FROM node:10.13.0
WORKDIR workdir/
ARG GIT_NAME
ARG GIT_EMAIL
ARG GIT_BRANCH

# add credentials on build
RUN mkdir /root/.ssh/
RUN mv ./git-ssh-key /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN echo 'IdentityFile /root/.ssh/id_rsa' > ~/.ssh/config

# make sure your domain is accepted
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts

# configure git
RUN git --version
RUN git config user.name ${GIT_NAME}
RUN git config user.email ${GIT_EMAIL}

COPY lerna.json package.json yarn.lock tslint.json .prettierignore .prettierrc ./

RUN npm install -g yarn
RUN yarn install -q

# install dependecies for packages
COPY ./packages/api-promise/package.json ./packages/api-promise/
COPY ./packages/http-provider/package.json ./packages/http-provider/
COPY ./packages/runtime-types/package.json ./packages/runtime-types/
COPY ./packages/types/package.json ./packages/types/
COPY ./packages/wallet/package.json ./packages/wallet/
RUN npx lerna bootstrap

# copy complete project - required for git push
COPY . .

# build package
RUN npx lerna run build

RUN git status
RUN git reset --hard

# Version packages and create versioned GIT commit
RUN npx lerna version --conventional-commits --yes --no-commit-hooks

# run prepublishOnly scripts if they exist, avoiding script-not-found errors
RUN npx lerna exec \
  --parallel \
  -- \
    "\
      HAS_PREPUBLISH_SCRIPT=\$(\
        node -e \"console.log(require('./package.json').scripts.prepublishOnly && 1 || '')\"\
      );\
      if [ -n \"\$HAS_PREPUBLISH_SCRIPT\" ]; then\
        npm run prepublishOnly --silent;\
      fi\
    ";

# pack packages for uploading
RUN npx lerna exec -- "npm pack"