import { Application } from "./app"

new Application()
	.build()
	.run()
	.catch((e) => console.error(e))
