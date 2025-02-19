target=$1
echo -e '\033[1;33m'$(date +"%F %T"): ${target}'\033[0m'

if [[ "${target}" == "backend" || "${target}" == "frontend" || "${target}" == "admin" || "${target}" == "all" ]]; then
  if [[ "${target}" == "all" ]]; then
    docker-compose up -d --build backend && docker-compose up -d --build frontend && docker-compose up -d --build admin
    echo "All containers have been started successfully."
  else
    docker-compose up -d --build "${target}"
    echo "${target} container has been started successfully."
  fi
else
  echo "Invalid target: ${target}"
  docker-compose up -d --build backend && docker-compose up -d --build frontend && docker-compose up -d --build admin
  echo "All containers have been started successfully."
fi
