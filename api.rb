# -*- coding: utf-8 -*-
require 'yodatra/base'
require 'yodatra/logger'
require 'yodatra/api_formatter'
require 'yodatra/throttling'

require 'rack/cors'

# ############## #
# Queen API #
# ############## #
class Api < Yodatra::Base
  VERSION = '0.0.1'
  config = Queen::Application::CONFIG
  use Yodatra::Logger
  use Yodatra::Throttle, redis_conf: config.redis

  use Rack::Cors do
    allow do
      origins '*'
      resource '*', :headers => :any, :methods => [:get, :post, :options]
    end
  end

  # api formatter
  use Yodatra::ApiFormatter do |status, headers, response|
    if headers['Content-Type'] =~ /application\/json/
      valid = status >= 200 && status < 300
      data = valid ? '?' : ''
      errors = valid ? '' : '?'
      replace = /.\?./
      body = response.empty? ? '' : response.first
      response = [{:data => data, :errors => errors}.to_json.gsub(replace, body)]
    end
    [status, headers, response]
  end

  use IdeasController
  use VoteController
  use ProjectController

  NO_ROUTE_PROC = lambda do
    status 400
    content_type 'application/json'
    [::Errors::NO_ROUTE].to_json
  end

  get //, &NO_ROUTE_PROC
  post //, &NO_ROUTE_PROC
  put //, &NO_ROUTE_PROC
  delete //, &NO_ROUTE_PROC

end
