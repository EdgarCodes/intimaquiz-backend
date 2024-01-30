import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { Sequelize } from "sequelize-typescript";


//Models 
import { Question } from "../models/question";

interface DatabasePluginOptions {
    host: string;
    port: number;
    database: string;
    user: string;
}

const setup_database: FastifyPluginAsync<DatabasePluginOptions> = async(fastify: FastifyInstance, opts) =>  {
    let database:Sequelize;

    if(process.env.ENV === "production") {
        database = new Sequelize({
            database: opts.database,
            username: opts.user,
            password: process.env.POSTGRESPASS,
            dialect: "postgres",
            dialectOptions: { socketPath: "/cloudsql/intimaquiz:us-central1:intimaquiz-db" },
            models: [Question]
        });

    }
    else {

        database = new Sequelize({
            host: opts.host,
            database: opts.database,
            dialect: "postgres",
            username: opts.user,
            password: process.env.POSTGRESPASS,
            models: [Question]
        });
    }

    try {
        await database.authenticate();
        fastify.log.info("Connected to database successfully");
        await database.sync();
    }
    catch(err) {
        fastify.log.error("Could not connect to database");
        throw err;
    }
}

export default setup_database;