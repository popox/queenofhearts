require 'sinatra/cookies'

# Takes care of omniauth callbacks
class OmniauthController < Sinatra::Base
  helpers Sinatra::Cookies
  OAUTH_TIMEOUT = ENV['OAUTH_TIMEOUT'] || (30)

  # Generic oauth callback
  get '/auth/:provider/callback' do
    oauth_token = auth_hash.credentials.token
    email = auth_hash.info.email
    name = auth_hash.info.name

    {token: oauth_token, email: email, name: name}
  end

  private

  # Standard for oauth hash information
  # https://github.com/intridea/omniauth/wiki/Auth-Hash-Schema
  def auth_hash
    request.env['omniauth.auth']
  end
end
