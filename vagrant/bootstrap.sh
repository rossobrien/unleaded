#!/usr/bin/env bash

if [ ! -d "/var/www" ]
then
	# Add mongodb to package manager
	sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
	echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/10gen.list

	# Update package manager and install utilities
	sudo apt-get -y update
	sudo apt-get install -y python-software-properties
	sudo apt-get install -y vim git curl
	sudo apt-get install -y memcached build-essential

	# Add nodejs to package manager
	sudo add-apt-repository -y ppa:chris-lea/node.js
	sudo apt-get -y update

	# Install nodejs and mongodb
	sudo apt-get install -y nodejs
	sudo apt-get install -y mongodb-10gen

	# Install bower globally via node
	npm install -g bower

	# Link vagrant sync folder to /var/www/[appname]
	sudo mkdir /var/www/
	sudo ln -s /vagrant/ /var/www/$1

	# Install node and bower dependencies
	cd /var/www/$1
	npm install
	bower install

	echo "Install finished! Node server is listening on http://10.0.01.100:8080/"

	# Run it
	node /var/www/$1/server.js

fi