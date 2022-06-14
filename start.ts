import dotenv from 'dotenv'
import app    from './app'

dotenv.config()

const serverPort = process.env.SERVER_PORT

app.listen(serverPort, () => {
    console.log(`Magic happens in port ${serverPort}`)
})