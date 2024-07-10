import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
config();   

const APP = express();  

APP.use(bodyParser.json());

export default APP;