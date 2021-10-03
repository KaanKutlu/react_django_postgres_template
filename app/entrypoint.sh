#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 1
    done

    echo "PostgreSQL started"
fi

# This will flush existing data from the db
# we ***DO NOT***** want to do this in prod
python manage.py flush --no-input
python manage.py migrate

exec "$@"
