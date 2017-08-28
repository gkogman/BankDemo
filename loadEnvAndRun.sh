#!/usr/bin/env bash

echo "
{
  \"GatewayApiUrl\" : \"${GATEWAY_API_URL}\",
  \"ActiveDirectoryTenant\" : \"${ACTIVE_DIRECTORY_TENANT}\",
  \"ActiveDirectoryClientId\" : \"${ACTIVE_DIRECTORY_CLIENTID}\",
  \"AdminGroupId\" : \"${ADMIN_GROUP_ID}\",
  \"DashboardUrl\" : \"${NETWORK_DASHBOARD_URL}\"
}
" > /usr/share/nginx/html/config.json

nginx -g 'daemon off;'
