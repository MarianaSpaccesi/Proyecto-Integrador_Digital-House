#!/usr/bin/bash
sed -i "s/{{TAG}}/$CI_COMMIT_SHORT_SHA/" compose.yml && \
docker-compose pull && \
docker-compose up -d --remove-orphans && \
docker image prune
