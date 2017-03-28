# NerdCats.DockerPull [![Build Status](https://travis-ci.org/NerdCats/NerdCats.DockerPull.svg?branch=master)](https://travis-ci.org/NerdCats/NerdCats.DockerPull)
Automatic Docker Deployment using WebHooks

Docker hook is a very simple node.js app that listens to your http requests and triggers your specified command.

## Features
- Lightweight, runs on express
- Dumb, simple authentication
- Simple to set up

## Steps to get it working
- Clone the repo
- `npm install`
- `gulp clean`
- `gulp build`
- `npm start`

To change the auth token, please modify `src/config.json` before hosting.

## To invoke a docker pull
By default the service listens to port 3000. Send a post request like the following to `/pull`, (this is for a sample `nginx:latest` docker image)

```json
{
	"mode": "docker",
	"image": "nginx:latest",
	"arguments": "-p 5000:80"
}
```

make sure you add the `token` query parameter with your defined `auth_token` in the config.json

Essentially it will execute a simple bash file inside `src/commands` folder. You can customize the repo further for your purpose. i.e. any bash file and other things you need in case of your deployment.
