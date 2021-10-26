yarn install --prod && \
echo "DB_CONNECTION=${DB_CONNECTION}" > .env && \
yarn prisma generate && yarn prisma migrate deploy
exit 0