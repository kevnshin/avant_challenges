require 'json'
require 'twitter'

FIVE_MIN = 300

file = File.read('./config.json')
keys = JSON.parse(file)


client = Twitter::Streaming::Client.new do |config|
  config.consumer_key        = keys['consumer_key']
  config.consumer_secret     = keys['consumer_secret']
  config.access_token        = keys['access_token']
  config.access_token_secret = keys['access_token_secret']
end

word_counts = Hash.new(0)
omit = [
  "and",
  "the",
  "me",
  "i",
  "a",
  "this",
  "in",
  "for",
  "im",
  "u",
  "to",
  "be",
  ""
]


time = Time.new
client.filter(locations: "-122.75,36.8,-121.75,37.8", language: "en") do |tweet|
  if tweet.is_a?(Twitter::Tweet)
    words = tweet.text.split
    for i in 0..words.length-1
      word = words[i].gsub(/[^a-zA-Z0-9]/, '').downcase
      word = '' if word[0..3] == "http"
      if not omit.include?(word)
        puts word
        word_counts[word] += 1 if word_counts.has_key?(word)
        word_counts[word] = 1 if !word_counts.has_key?(word)
      end
    end
  end
  break if Time.new - time >= FIVE_MIN
end

puts "\nThe words with the highest occurrences are: "
for i in 0..10
  highest = word_counts.max_by{|k,v| v}[0]
  puts "'#{highest}' with #{word_counts[highest]} occurrences"
  word_counts.delete(highest)
end

