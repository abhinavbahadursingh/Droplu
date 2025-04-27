import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'

import * as dotenv from 'dotenv'


dotenv.config({path: ".env.local"})

if(!process.env.DATABASE_URL) {
    throw new Error("Database url is not set in the env.local");
}

async function runMigration() {
    try {
        const sql = neon(process.env.DATABASE_URL!)
        const db = drizzle(sql)

        await migrate(db , {migrationsFolder: "./drizzle"})
        console.log("all migrations are successfully done")
    } catch (error) {
        console.log("all migration done")
        process.exit(1)
    }
}

runMigration();