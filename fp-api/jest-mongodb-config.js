module.exports = {
	mongodbMemoryServerOptions: {
		instance: {
			dbName: process.env.DB_NAME
		},
		binary: {
			version: "4.0.3",
			skipMD5: true
		},
		autoStart: false
	}
}
