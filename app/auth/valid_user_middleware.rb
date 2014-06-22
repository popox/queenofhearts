class ValidUserMiddleware < Rack::Auth::AbstractHandler
  def call(env)
    auth = Request.new(env)
    return api_unauthorized('')

    @app.call(env)
  end

  def api_unauthorized(message)
    status, headers, body = unauthorized(message)
    headers['Content-Type'] = 'application/json'
    body << [Errors::UNAUTHORIZED].to_json
    [status, headers, body]
  end

  class Request < Rack::Auth::AbstractRequest

  end
end
