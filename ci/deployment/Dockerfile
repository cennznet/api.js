ARG IMAGE_NAME
FROM ${IMAGE_NAME}
WORKDIR workdir/

ARG GIT_NAME
ARG GIT_EMAIL
ARG GIT_BRANCH
ARG GEMFURY_TOKEN

# add credentials on build
RUN mkdir /root/.ssh/
COPY ./git-ssh-key ./git-ssh-key
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

# sync git
RUN git checkout ${GIT_BRANCH}
RUN git fetch
RUN git reset --hard origin/${GIT_BRANCH}

RUN git status
RUN git reset --hard

# Version packages and create versioned GIT commit
RUN npx lerna version --conventional-commits --yes --no-commit-hooks

# run prepublishOnly scripts if they exist, avoiding script-not-found errors
RUN npx lerna exec  --scope=cennzx-sdk \
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
RUN npx lerna exec --scope=cennzx-sdk -- "npm pack"

# push all packages to Gemfury centrality
RUN \
  echo 'Pushing packages \${workdir} to Gemfury' && \
  npx lerna exec --scope=cennzx-sdk \
    -- \
      "\
        PUSH_URL=\"https://${GEMFURY_TOKEN}@push.fury.io/centrality/\" && \
        PACKAGE_NAME=\$(node -p \"try {require('./package.json').name} catch(e){'0.0.0'}\") && \
        PACKAGE_VERSION=\$(node -p \"try {require('./package.json').version} catch(e){'0.0.0'}\") && \
        TAR_PATH=\"\$(pwd)/\${PACKAGE_NAME}-\${PACKAGE_VERSION}.tgz\" && \
        if [ ! -f TAR_PATH ]; then continue; fi && \
        echo \" - Pushing package: \$PACKAGE_NAME\" && \
        ( \
          RESPONSE=\$(curl -sS -F package=@\${TAR_PATH} \${PUSH_URL}) && \
          echo \"\${RESPONSE}\" && \
          case \"\${RESPONSE}\" in \
            *\"... ok\"*) echo \" - Pushed package: \$PACKAGE_NAME\";; \
            *        ) (echo \" - Failed to push package: \$PACKAGE_NAME\" && exit 1);; \
          esac \
        ); \
      ";