# microservices-by-example

## Docker

```sh
# Build the image
> docker build -t video-streaming --file Dockerfile .
# -t tag = readable name
# --file specify docker file name

# Run the image
> docker run -d -p 3000:3000 -e PORT=3000 video-streaming
# -d detached mode = run in the background
# -p forward ports
# -e set variable
# video-streaming name of the image

# Container info
> docker container list
> docker logs <container-id>

# Debug the container, will open a shell in the container
> docker exec -it <container-id> sh

# Cleanup commands
> docker container list --all
> docker stop <container-name>
> docker rm <container-name>
> docker image rmi <image-id> -f

# Publishing the image to the registry
# Create repository on ECR
# 1. Login from the command line
> aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 238829.dkr.ecr.eu-north-1.amazonaws.com

# build the image
> docker build -t video-streaming .

# 2. Tagging
> docker tag video-streaming:latest 238829.dkr.ecr.eu-north-1.amazonaws.com/video-streaming:latest

# 3. Push to registry
> docker push 238829.dkr.ecr.eu-north-1.amazonaws.com/video-streaming:latest

# 4. Use image from repository
> docker run -d -p 3000:3000 -e PORT=3000 238829.dkr.ecr.eu-north-1.amazonaws.com/video-streaming

# Get aws credentials
> aws configure get aws_access_key_id
>aws configure get aws_secret_access_key
```
