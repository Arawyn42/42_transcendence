#!/bin/sh

if [ -z "$DJANGO_SECRETKEY" ]; then
	export DJANGO_SECRETKEY=$(head -c 50 /dev/random | base64)
fi

env/bin/python mysite/manage.py makemigrations
env/bin/python mysite/manage.py migrate

cd mysite && ../env/bin/python -u -m daphne -b 0.0.0.0 -p 8001 mysite.asgi:application
