target=$1
echo -e '\033[1;33m'$(date +"%F %T"): ${target}'\033[0m'

if [[ "${target}" == "backend" || "${target}" == "frontend" || "${target}" == "all" ]]; then
  if [[ "${target}" == "all" ]]; then
    docker-compose build backend && docker-compose build frontend
  else if
    docker-compose build "${target}"
  fi
fi
