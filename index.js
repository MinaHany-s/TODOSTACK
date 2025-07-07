import express from 'express'
import dotenv from 'dotenv'
import { initApp } from './src/initApp.js'
import { startAgenda } from './src/agenda/agendaStartUp.js'

dotenv.config({ path: './config.env', debug: false })

const app = express()

startAgenda().catch(console.error);

initApp(app, express)