const smartObject = {
	async read(req, res) {
		res.json({ cpu: 10, temp: 24, memory: 60 })
	}
}

module.exports = smartObject
