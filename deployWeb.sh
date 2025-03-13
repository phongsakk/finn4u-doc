git fetch && git pull && docker compose up --build -d frontend

location=$(pwd)

. "$location/discord.sh" "# Web is deployed\n[link](http://203.159.93.236:8079)"