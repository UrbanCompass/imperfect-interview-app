FROM node:10.16.1-alpine

WORKDIR /listing-video-editor

LABEL git_repo=uc-frontend
ENV PNPM_VERSION 4.12.0
ENV PNPM_REGISTRY https://urbancompass.jfrog.io/urbancompass/api/npm/npm/

RUN apk update && \
    apk add --update --no-cache curl && \
    rm /var/cache/apk/*

RUN curl -L https://raw.githubusercontent.com/pnpm/self-installer/master/install.js | node

COPY package.json pnpm-lock.yaml .npmrc /listing-video-editor/

RUN pnpm i --production

COPY . /listing-video-editor/

CMD node -r @uc/datadog-apm dist/server.js
