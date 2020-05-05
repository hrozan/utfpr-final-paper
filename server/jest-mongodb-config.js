// noinspection JSUnresolvedVariable
module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: global.__MONGO_DB_NAME__
    },
    binary: {
      version: "4.0.3",
      skipMD5: true
    },
    autoStart: false
  }
}
