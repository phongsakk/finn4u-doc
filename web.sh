#!/bin/bash

git fetch
git pull
docker compose up --build -d frontend

# ใช้ absolute path เพื่อป้องกันปัญหาเกี่ยวกับ relative path
location=$(realpath "$(dirname "$1")")

# รัน script แจ้งเตือนใน Discord
bash "$location/discord.sh" "# Web(User) is deployed\n[link](https://finn4u.com)"