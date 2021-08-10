import { createConnection } from "typeorm"
import { User } from "../../domains/users/user.entity"
import { hash } from "bcrypt"

async function main(): Promise<void> {
	const connection = await createConnection()
	const repository = await connection.manager.getRepository(User)

	const user = new User()
	user.email = "admim@email.com"
	user.userName = "admin"
	user.password = await hash("adminpass", 10)

	await repository.save(user)
	console.log("Admin created")

	await connection.close()
}

main()
