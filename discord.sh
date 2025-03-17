message="$1"

url1="https://discord.com/api/webhooks/134979009"
url2="YJm1lAzn25Eka-4C1_nW2Rf7LZjcz5lkE055en001"
url3="9218501705/1dTvD5R9e-BmHmBsDP7MTWaMFi0"
curl --location "$url1$url3$url2" \
--header 'Content-Type: application/json' \
--data "{\"content\": \"$message\"}"