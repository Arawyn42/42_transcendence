# 42_transcendance

## How to build
First thing first, you will need to install docker and docker compose on your machine - https://docs.docker.com/engine/install/

(you may have to run docker commands as root if your user does not belong to the docker group)

Clone this repository:
```sh
git clone https://github.com/Arawyn42/42_transcendance
```
Next enter the directory and setup the environment file:
```sh
cp dev.env .env && nano .env
```
You may need to create the folders for the docker volumes:
```sh
mkdir -p data/mysite
```
Build the project using docker compose: 
```sh
docker compose build
```
Run the webserver:
```sh
docker compose up -d
```

The server should now be running locally. You can try connecting to it on your browser under the ip 127.0.0.1:8000 (default port in the .env file)