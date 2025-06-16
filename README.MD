# FINN4U

`project ฝากขายอสังหาฯ` `golang` `nextjs` `docker`

## Scripts

- ### Build whole project

```sh
docker-compose up --build -d
```

- ### Or build specified service

```sh
docker-compose up --build -d {service_name}
```

## Stacks

|TOOLS|VERSION|DESCRIPTION|
|--|--|--|
|**Golang**|*1.22.3*|The Go programming language|
|**NodeJS**|*v22.14.0*|The JavaScript programming language|
|**Next.js**|*15.1.6*|A React framework for building server-rendered applications|

## Ports

|SERVICE|CONTAINER|PORT|DESCRIPTION|
|--|--|--|--|
|**API**|finn4u_api|8078:8080|golang api|
|**User Web**|finn4u_frontend|8079:3000|nginx, next js|
|**Admin Web**|finn4u_admin|8076:3000|nginx, next js|
|**Database**|finn4u_api|8077:5432|posgreSQL|

## Nginx Configuration

```sh
cp ./finn4u /etc/nginx/sites-available/
```

```sh
nginx -t
```

```sh
systemctl restart nginx
```
