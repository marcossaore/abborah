#!bin/bash
HAS_DOCKER_COMPOSE=$($(docker-compose -v) && echo "YES" || echo "NO");

if [ "$HAS_DOCKER_COMPOSE" == "YES" ]; then
    docker-compose -f docker-compose.test.yml down
fi