#!/bin/bash

git fetch
git pull
docker compose up --build -d admin

# ใช้ absolute path เพื่อป้องกันปัญหาเกี่ยวกับ relative path
location=$(realpath "$(dirname "$1")")

# รัน script แจ้งเตือนใน Discord
bash "$location/discord.sh" "# Web(Admin) is deployed\n[click here](https://admin.finn4u.com)"
