import amqp from 'amqplib';
import { config } from 'dotenv';
config();

import sendMail from '../services/send-mail.service.js';

const HOST_NAME = process.env.HOST_NAME;
const RABBIT_PORT = process.env.RABBIT_PORT;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const queue = process.env.QUEUE_NAME;

const URI = `amqp://${USER}:${PASSWORD}@${HOST_NAME}:${RABBIT_PORT}`;
//console.log(URI);

const consumeQueue = async () => {
   try {
      const connect = await amqp.connect(URI);
      const channel = await connect.createChannel();

      await channel.assertQueue(queue, {
         durable: true
      });

      channel.consume(queue, message => {
         //console.log("message received", message);
         if (message !== null) {
            const data = JSON.parse(message.content.toString());
            console.log("message consumed");
            channel.ack(message);

            setTimeout(() => {
               connect.close();
            }, 500);

            const send = async (data) => {
               try {
                  const response = await sendMail(data);
               } catch (error) {
                  console.log("Error ->", error);
               }
            }

            send(data);

         }
      })

   } catch (error) {
      console.log(error);
   }
}

export default consumeQueue;