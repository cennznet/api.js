ARG IMAGE_NAME
FROM ${IMAGE_NAME}
WORKDIR workdir/

ARG GIT_NAME
ARG GIT_EMAIL
ARG RELEASE_SCOPE

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

RUN git status
RUN git reset --hard

# Version packages and create versioned GIT commit
RUN npx lerna version ${RELEASE_SCOPE} --yes --no-commit-hooks --force-publish=*

RUN npx lerna exec -- 'cpx package.json build/'
# run prepublishOnly scripts if they exist, avoiding script-not-found errors
#RUN npx lerna exec --scope={@cennznet/api,@cennznet/types,@cennznet/wallet,@cennznet/util} \
#  --parallel \
#  -- \
#    "\
#      HAS_PREPUBLISH_SCRIPT=\$(\
#        node -e \"console.log(require('./package.json').scripts.prepublishOnly && 1 || '')\"\
#      );\
#      if [ -n \"\$HAS_PREPUBLISH_SCRIPT\" ]; then\
#        npm run prepublishOnly --silent;\
#      fi\
#    ";

RUN conventional-changelog -p angular -i CHANGELOG.md -s -r1