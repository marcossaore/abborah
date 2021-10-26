#!bin/bash
docker-compose exec db_integration pwd || docker-compose up -d db_integration && \
yarn prisma generate && \
yarn prisma migrate dev