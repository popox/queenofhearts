#!/bin/bash

pushd /home/app
bundle install --deployment
bundle exec rake db:setup
bundle exec rake db:migrate
RACK_ENV=test bundle exec rake db:setup
RACK_ENV=test bundle exec rake db:seed
RACK_ENV=test bundle exec rake db:migrate
popd 

# Configure NGINX
mkdir -p /etc/nginx/sites-enabled
rm -rf /etc/nginx/sites-enables/*
cp /home/app/dev.queenofhearts.io.conf /etc/nginx/sites-enabled

