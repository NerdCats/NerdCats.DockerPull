#! /bin/bash

IMAGE=$1
ARGLIST=$2
docker ps | grep $IMAGE | awk '{print $1}' | xargs docker stop
docker ps -a | grep $IMAGE | awk '{print $1}' | xargs docker rm
docker pull $IMAGE
docker run -d $ARGLIST $IMAGE