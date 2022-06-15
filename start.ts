import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app'

dotenv.config()

const serverPort: string | undefined = process.env.SERVER_PORT
const dbEngine: string | undefined = process.env.DB_ENGINE
const dbHost: string | undefined = process.env.DB_HOST
const dbName: string | undefined = process.env.DB_NAME

const databaseUri: string = `${dbEngine}://${dbHost}/${dbName}`

mongoose.connect(databaseUri)

app.listen(serverPort, () => {
    console.log(`Magic happens in port ${serverPort}`)
})
