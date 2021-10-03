# pull official base image
FROM python:3.9.5-slim-buster

# set working directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# new
# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql nodejs npm graphviz graphviz-dev httpie \
  && apt-get clean


# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# run
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh


# add app
# This might be required if docker compose is not being used
# and manual docker deploys are happening
#COPY . .

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
