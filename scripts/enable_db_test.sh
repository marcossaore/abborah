#!bin/bash
HAS_DOCKER_COMPOSE=$($(docker-compose -v) && echo "YES" || echo "NO");

if [ "$HAS_DOCKER_COMPOSE" == "YES" ]; then

  if [ -z `docker-compose -f docker-compose.test.yml ps --services --filter "status=running" | grep db_integration` ]; then
    docker-compose -f docker-compose.test.yml up -d db_integration
    yarn prisma generate 
  fi 


  while true; do 
    yarn prisma migrate dev
    if [[ "$?" -ne 1 ]]; then 
      break
    fi
    echo "Waiting for db to be ready..."
    sleep 20
  done
fi