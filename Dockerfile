# FROM node:17.3.0-alpine3.14
FROM denoland/deno:1.17.0

EXPOSE 8000
COPY vendor /vendor
COPY index.ts /index.ts
# COPY package.json /package.json
# COPY package-lock.json /package-lock.json
CMD ["run","--allow-net","--allow-read" ,"--unstable","index.ts"]
# COPY docker-entrypoint.sh /docker-entrypoint.sh

# COPY --from=0 / /

# ENTRYPOINT ["/docker-entrypoint.sh"]
