require 'net/http'

url = URI.parse('https://stream.twitter.com/1.1/statuses/sample.json')
req = Net::HTTP::Get.new(url.to_s)
res = Net::HTTP.start(url.host, url.port) { |http|
  http.request(req)
}
puts res.body