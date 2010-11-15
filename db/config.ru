use Rack::Reloader, 0
use Rack::ContentLength

require './minedraft'

app = proc do |env|
  db = Minedraft::DB.new(app)
  db.response(env)
end

run app
