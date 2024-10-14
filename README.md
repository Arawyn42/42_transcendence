# 42_transcendence

## How to build
First thing first, you will need to install docker and docker compose on your machine - https://docs.docker.com/engine/install/

(you may have to run docker commands as root if your user does not belong to the docker group)

--> Decomposer les différentes étapes avec des screens si possible.

Clone this repository:
```sh
git clone https://github.com/Arawyn42/42_transcendence transcendence
```
Enter the directory:
```sh
cd transcendence
```
Setup the environment file:
```sh
cp dev.env .env && nano .env
```
For the email and password used for 2fa, you need to create a gmail address and to create an application password.

(...) -> Explain how to do that with screens.

Create a folder for the database docker volume with appropriated permissions:
```sh
mkdir data && sudo chown -R $USER:$USER data && chmod -R 755 data
```
Build and run the project with docker compose: 
```sh
docker compose up -d --build
```

In your browser, go to this url:
```
https://localhost
```