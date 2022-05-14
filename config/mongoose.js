const { info, mongooseDebug } = require("../debugging/debug");
const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URL;

module.exports = (app) => {
    mongoose
        .connect(mongo_url)
        .then(() => {
            mongooseDebug(`Server connected to MongoDB...`);

            const port = process.env.PORT;
            app.listen(port, () => info(`Server is running on...http://localhost:${port}`));
        })
        .catch(() => mongooseDebug(`Server is not connected to MongoDB...`));
};
