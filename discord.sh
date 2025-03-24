message="$1"

url1="https://discord.com/api/webhooks/1353764896"
url2="_w-Enj3Vy1ehYUKiklYkwQufGtDQf6wEr"
url3="390774825/3eUVybBpnjDvXThOpEPBUeb7HV1x8q6q4k9"

curl --location "$url1$url3$url2" \
--header 'Content-Type: application/json' \
--data "{\"content\": \"$message\"}"