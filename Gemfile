source 'https://rubygems.org'

gem 'rake'

gem 'yodatra', '>= 0.3.0'

# Middleware
gem 'rack'
gem 'rack-contrib', :git => 'https://github.com/rack/rack-contrib.git', :require => false # 1.2.0 not yet on rubygems...
gem 'rack-rewrite'
gem 'rack-parser', :require => 'rack/parser'

# DB adapter
gem 'mysql2'
gem 'activerecord', '4.0.2'
gem 'sinatra-activerecord', '1.4.0'

# Cache
gem 'redis'
gem 'redis-rack'

# Omniauth
gem 'omniauth-github', '1.1.2'

gem 'rspec'
group :development do
  # Debug
  gem 'pry'
  #gem 'pry-debugger'
end

group :test do
  # Testing
  gem 'simplecov'
  gem 'rack-test', require: 'rack/test'
end
