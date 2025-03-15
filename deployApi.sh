#!/bin/bash

git fetch
echo "fetched version"
git pull
echo "pulled version"
docker compose up --build -d backend

# ใช้ absolute path เพื่อป้องกันปัญหาเกี่ยวกับ relative path
location=$(realpath "$(dirname "$0")")

echo "in $0"
# รัน script แจ้งเตือนใน Discord
bash "$location/discord.sh" "# API is deployed\n[link](http://203.159.93.236:8078)"