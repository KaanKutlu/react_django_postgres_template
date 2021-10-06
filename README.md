# Unnamed Template


This is a simple template for a django, react-frontend, and postgres db.

## Docker Setutp

### Run Docker

To start docker run this command


```bash
# Spins up docker.
docker-compose up --build -d
```

Now - https://localhost should show the react app and https://localhost:8009 should show django.


To take down docker 


```bash
docker-compose down -v --remove-orphans
```

## Django

Djago should give you the entry page here: http://localhost:8009/ after deploying the app. *NOTE: http - not https*

### Django Project and App

Django project lives in the directory called `app/drf_project`. You will find settings, and to open up new API calls in `app/drf_project/urls.py`, but it is importing `app/unnamed/urls.py`.

* Add to the ORM in `app/unnamed/models.py`.
* Add to serializers in `app/unnamed/serializzers.py`
* Add to views in `app/unnamed/views.py`
* Add to urls in `app/unnamed/urls.py`


### Updating Django ORM

To update the ORM in the backend, run

```bash
# Update ORM
python manage.py makemigrations
python manage.py migrate
```


## React/JS

### Create simple app

Within `app/frontend` is where the logic for the frontend.

Right now, it is the default "blank" react app that will link to tutorial resources.


# Warnings:

## THIS IS A DEVELOPMENT ENVIROMENT.

Please, take into consideration this is a development focus deploy system. To be "production ready" there are a few configuration aspects that need to be change.

Look into: https://create-react-app.dev/docs/deployment/ For react prod deploys and https://docs.djangoproject.com/en/3.2/howto/deployment/

Ensure you change `app/.env.dev` for correct production values.
