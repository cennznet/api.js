echo 'Pushing packages \${workdir} to Gemfury'

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