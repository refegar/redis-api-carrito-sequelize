const dotenv = require("dotenv");
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
module.exports = {
    DB:
		"mongodb+srv://" +
		process.env.DB_USER +
		":" +
		process.env.DB_PASS +
		"@" +
		process.env.DB,

	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PASS: process.env.SMTP_PASS,

    development: {
        username:  process.env.USERNAME,
        password:process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306
    },
    test: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306
    },
    production: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '',
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306
    }


}

