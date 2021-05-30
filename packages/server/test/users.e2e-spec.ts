import 'should'
import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { UserRequest } from '../src/users/user.request'

export type TestApplicationFixture = { app: INestApplication; module: TestingModule }

const startApplicationForTesting = async (): Promise<TestApplicationFixture> => {
	const module: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile()

	const app = await module.createNestApplication().enableShutdownHooks().useGlobalPipes(new ValidationPipe()).init()
	return { module, app }
}

describe('/users', () => {
	let server: any
	let fixture: TestApplicationFixture
	beforeAll(async () => {
		fixture = await startApplicationForTesting()
	})

	afterAll(async () => {
		await fixture.app.close()
	})

	beforeEach(() => {
		server = fixture.app.getHttpServer()
	})

	describe('POST', () => {
		let payload: UserRequest

		beforeEach(() => {
			payload = {
				userName: 'hrozan',
				email: 'higorb.rozan@gmail.com',
				password: 'pass123',
			}
		})

		it('should return CREATED', async () => {
			const response = await request(server).post('/users').send(payload)
			console.log(response.body)
			response.status.should.be.equal(HttpStatus.CREATED)
			expect(2 + 2).toBe(4)
		})

		// it('should return a id', async () => {
		//   payload.userName = 'test2';
		//
		//   const response = await request(server).post('/users').send(payload);
		//
		//   response.body.id.should.not.be.Null();
		// });
	})
})
