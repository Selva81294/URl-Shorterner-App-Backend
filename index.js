import dotenv from 'dotenv'
import express from 'express'
import {dataBaseConnection} from "./db.js"
import cors from 'cors'
import { urlShortRouter } from './router/urlShort.js'
import loginRouter from './router/LoginUser.js'
import signupRouter from './router/SignupRouter.js'
import forgotPasswordRouter from './router/Forgotpasword.js'
import resetpasswordRouter from './router/Resetpassword.js'

//env configaration
dotenv.config()

//db connections
dataBaseConnection();

const app = express();
const PORT = process.env.PORT

//middlewares
app.use(express.json());
app.use(cors())

//middlewares for routers
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/forgotpassword', forgotPasswordRouter)
app.use('/resetpassword', resetpasswordRouter)
app.use('/shURL', urlShortRouter)

app.listen(PORT, ()=>console.log(`Server is up and running in Port ${PORT}`))