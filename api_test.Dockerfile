FROM node:13

ENV PROJECT_DIR=/app

WORKDIR $PROJECT_DIR
RUN echo $PWD
COPY package.json $PROJECT_DIR
COPY yarn.lock $PROJECT_DIR
COPY . $PROJECT_DIR

RUN apt-get update && apt-get install -y \
  apt-utils \
  automake \
  curl \
  # vim \
  && yarn  --pure-lockfile \
  && rm -rf /var/lib/apt/lists/*

RUN chmod +x ./scripts/*

ENTRYPOINT ["./scripts/api_test_docker_entrypoint.sh"]
