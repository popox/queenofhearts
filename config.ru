require 'rack'
require 'rack/contrib/try_static'
require 'rack/contrib/not_found'
require 'rack/rewrite'
require 'rack/parser'

require File.dirname(__FILE__)+'/api'

use Rack::Parser, :parsers => { 'application/json' => proc { |data| JSON.parse data } }

use Rack::Rewrite do
  rewrite %r{^/\w{2}/api},  '/api'
end

map '/api' do
  run Api
end

map '/' do

  use Rack::TryStatic,
      :root => ::File.join(File.dirname(__FILE__), '.'),
      :urls => %w(/),
      :try  => ['.html', 'index.html', '/index.html']

end

run Rack::NotFound.new(::File.join(File.dirname(__FILE__), 'public/404.html'))
