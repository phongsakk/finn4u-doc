#!/bin/bash

git fetch
git pull
docker compose up --build -d backend

# ใช้ absolute path เพื่อป้องกันปัญหาเกี่ยวกับ relative path
location=$(realpath "$(dirname "$1")")

# รัน script แจ้งเตือนใน Discord
bash "$location/discord.sh" "# API is deployed\n[link](https://api.finn4u.com)"