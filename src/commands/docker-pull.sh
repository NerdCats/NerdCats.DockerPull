#! /bin/bash

IMAGE=$1
ARGLIST=$2
docker ps | grep $IMAGE | awk '{print $1}' | xargs docker stop
docker pull $IMAGE
docker run -d $IMAGE $ARGLIST