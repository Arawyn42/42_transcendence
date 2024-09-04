#!/bin/bash

export PATH=$PATH:

if [ -z "$( ls -A '/usr/local/pgsql/data/' )" ]; then
	echo "No database detected, creating..."
	service postgresql start
	mkdir -p /usr/local/pgsql/data
	chown postgres /usr/local/pgsql/data
	sudo -u postgres /usr/lib/postgresql/13/bin/initdb -D /usr/local/pgsql/data
	sudo -u postgres /usr/lib/postgresql/13/bin/createdb mydb
	cd ..
fi

if service postgresql status > /dev/null; then
    service postgresql stop
fi

sudo -u postgres /usr/lib/postgresql/13/bin/postgres -D /usr/local/pgsql/data