import dns from "dns"
import { MongoClient } from "mongodb"
import { DB_NAME, DB_URL } from "../config.js"

dns.setServers(["8.8.8.8"])

const client = new MongoClient(DB_URL, {
    serverSelectionTimeoutMS: 5000
})

export const startserver = async (port, app) => {
    try {
        await client.connect()

        console.log("connected to db")

        app.listen(port, () => {
            console.log("server is ready")
        })

    } catch (error) {
        console.log(error)
    }
}

export const db = client.db(DB_NAME)