message="$1"

curl --location 'https://discord.com/api/webhooks/1349790099218501705/1dTvD5R9e-BmHmBsDP7MTWaMFi0YJm1lAzn25Eka-4C1_nW2Rf7LZjcz5lkE055en001' \
--header 'Content-Type: application/json' \
--data "{\"content\": \"$message\"}"