require 'rubygems'
require 'mongo'
require 'json'
require 'bson'
require 'rack'
require 'base64'
include Mongo
include BSON

module Minedraft
  class DB
    def initialize(app)
      @app = app
    end

    def response(env)
      status, headers, response = env

      req = Rack::Request.new(env)

      db = Connection.new.db('minedraft')
      coll = db.collection('drafts')

      request_id = status["REQUEST_URI"].split('/')[2]

      if(request_id && !req.post?)
        begin
          bson_request_id = ObjectId.from_string(request_id)
          response = coll.find_one("_id" => bson_request_id)
          response = response.nil? ? "{error: \"Record Not Found\"}" : response["objects"].to_json
        rescue BSON::InvalidObjectId
          response = "{error: \"Invalid ID Format\"}"
        end
      else
        if(!validRequest(status))
          response = "{error: \"Invalid request\"}"
        else
          data = req.POST["objects"]
          # Search for this draft in the DB
          row = coll.find_one("objects" => data)
          if(row)
            response = row["_id"].to_s
          else
            row = coll.save("objects" => data)
            response = row.to_s
          end
        end
      end
      
      [200, { "Content-Type" => "application/json" }, response ]
    end

    def validRequest(status)
      valid = true
      if(status["REQUEST_METHOD"] != "POST")
        valid = false
      end
      if(status["QUERY_STRING"] != "")
        valid = false
      end
      if(status["HTTP_REFERER"] != "https://beta.minedraft.net/")
        valid = false
      end
      
      valid
    end
  end
end
