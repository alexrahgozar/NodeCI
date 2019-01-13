const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const keys = require("../config/keys");

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.usesCache = true;
  this.hashKeyToUse = JSON.stringify(options.key || "");
  // to be chainable return this
  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.usesCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );
  // check for value inside redis
  const cacheValue = await client.hget(this.hashKeyToUse, key);
  // if yes return value

  if (cacheValue) {
    // console.log("Kache: ", cacheValue);
    // model represent the query this model is attach to
    // and create a new instance and pass in the properties
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => this.model(d))
      : new this.model(doc);
  }

  // if no issue query and store the result
  const result = await exec.apply(this, arguments);
  client.hset(this.hashKeyToUse, key, JSON.stringify(result), "EX", 10);

  return result;
  // test before return statement
  // console.log("I'm about to run a quary!");
  // console.log(this.getQuery());
  // console.log(this.mongooseCollection.name);
  // console.log(key);
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
