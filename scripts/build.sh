target=$1
echo -e '\033[1;33m'$(date +"%F %T"): ${target}'\033[0m'

if [[ "${target}" == "backend" || "${target}" == "frontend" || "${target}" == "all" ]]; then
  if [[ "${target}" == "all" ]]; then
    docker-compose up -d --build backend && docker-compose up -d --build frontend
  else
    docker-compose build "${target}"
    docker compose up -d --build "${target}"
  fi
else
  echo "Invalid target: ${target}"
fi
