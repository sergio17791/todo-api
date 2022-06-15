import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

chai.use(chaiAsPromised)

let mongoServer: MongoMemoryServer

before(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()
    await mongoose.connect(mongoUri)
})

after(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})
