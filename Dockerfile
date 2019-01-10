FROM 370531249777.dkr.ecr.ap-south-1.amazonaws.com/ubuntu:16.04

# Install essentials
RUN apt-get update && \
	apt-get install -y \
		curl \
		build-essential \
		ca-certificates \
		gcc \
		git \
		libpq-dev \
		make \
		python-pip \
		python2.7 \
		python2.7-dev \
		ssh

# Install nginx
RUN apt-get install -y nginx

# Configure nginx
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

# Install node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
	apt-get install -y nodejs

# Cleanup
RUN apt-get autoremove
RUN apt-get clean

# Set env variables
ENV UV_THREADPOOL_SIZE=128

# exposing port
EXPOSE 80

# Copying nginx config files
COPY config/service.nginx.conf /etc/nginx/servers/ecs-service
COPY config/container.nginx.conf /etc/nginx/nginx.conf

COPY utils utils
COPY config config
COPY . .


WORKDIR /benchmark-go-node-python

#install dependencies
RUN pip install -q -r requirements.txt
