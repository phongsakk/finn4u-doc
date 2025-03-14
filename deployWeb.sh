#!/bin/bash

git fetch && git pull && docker compose up --build -d frontend

# ใช้ absolute path เพื่อป้องกันปัญหาเกี่ยวกับ relative path
location=$(realpath "$(dirname "$0")")

# รัน script แจ้งเตือนใน Discord
bash "$location/discord.sh" "# Web is deployed\n[link](http://203.159.93.236:8079)"