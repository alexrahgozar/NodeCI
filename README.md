# AdvancedNodeStarter

Starting project for a course on Advanced Node @ Udemy

list of dependecncy:
brew install redis
brew services start redis
To check if its running : redis-cli ping
redis uses get and set method /
set parameters are key & value pair
get parameters are key and a callback function (err,val) => log(val)

example use of redis:

1.  on root dirctory run node
2.  const redis = require("redis")
3.  const redisUrl = "redis://127.0.0.1:6379"
4.  const client = redis.createClient(redisUrl)
5.  client.set("hello", "world")
6.  client.get("hello", (err,val) => console.log(val)) or client.get("hello", console.log)

exmaple of redis hash

1.  hset("key1", "key2", "value")
2.  hget("key1", "key2", callback function)

edge case: can't store any objects only string and numbers

- objects must be turned into strings before storing
  (JSON.stringify({red:"rojo"})) then JSON.parse(val)

example delete data from redis:

1.  on root dirctory run node
2.  const redis = require("redis")
3.  const redisUrl = "redis://127.0.0.1:6379"
4.  const client = redis.createClient(redisUrl)
5.  client.flashall()

For cache expiration -- to update redis:
client.set("color", "red", "EX", 5)

Integration Testing - jest & puppeteer

1.  Header
2.  O-Auth Flow & Authentication

example with session and keygrip

1.  const session = "eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWMzNDEwMDhkNWEzYWUyNmVhMzg1Yzg5In19"
2.  const Buffer = require("safe-buffer").Buffer
3.  Buffer.from(session, "base64").toString("utf8")

4.  const session = "eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWMzNDEwMDhkNWEzYWUyNmVhMzg1Yzg5In19"
5.  const Keygrip = require("keygrip")
6.  const keygrip = new Keygrip(["123123123"])
7.  keygrip.sign("session=" + session)
8.  keygrip.verify("session=" + session, "12CImOp9Rao0X0EQAN49D2LTn7Y")

Continuous Integration

Travis Ci:

1.  nohub - if the is closed don't kill anthing this command creates
2.  npm run start - run the server
3.  & - run this command in a subshell (in the background)
4.  Terminate - pkill NODE_ENV

Github:
To Find out if remote is setup: git remote -v
To Remove origin: git remote remove origin
New Origin: git remote add origin git@github.com:alexrahgozar/NodeCI.git

Travis Git:
git add .
git commit -m "Travis Config"
git status
git push origin master
