#!/usr/bin/env bash

docker build -t escrow-webapp . && \
 docker run --name escrow-webapp -d -p 4200:80 --rm \
 -e GATEWAY_API_URL=http://p1-api-crypletfx.azurewebsites.net \
 -e ACTIVE_DIRECTORY_TENANT=blockchainpoc.onmicrosoft.com \
 -e ACTIVE_DIRECTORY_CLIENTID=b9821450-3e4d-4d9f-b323-d5d8a8bcf991 \
 -e ADMIN_GROUP_ID=4edfb3b3-e7eb-420f-93a8-33de10685e0a \
 escrow-webapp
