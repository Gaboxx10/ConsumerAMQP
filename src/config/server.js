console.clear();
import APP from "../app.js";
import { config } from "dotenv";
config();   

import amqpConsume from "../rabbitmq/amqp.consume.js";

const PORT = process.env.PORT || 3000;

APP.listen(PORT, async (req, res) => {
    console.log(`Server is running on port ${PORT}`);
    try {
       const data = await amqpConsume();
    } catch (error) {
       console.log("Error ->",error);
    }
});