import dbConnection from "../db/dbConnenction.js";
import globalErrorHandling from "./utils/globalErrorHandling.js";
import userRouter from './modules/user/user.routes.js'
import tagRouter from "./modules/tag/tag.routes.js";
import todoRouter from "./modules/todo/todo.routes.js";



import { applySecurity } from './middlewares/security.middleware.js';

export const initApp = (app, express) => {

    // Parse request bodies
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));

    applySecurity(app);




    const port = process.env.PORT || 3001;



    dbConnection()

    app.get('/', (req, res) => {
        res.status(200).json({
            status: "success",
            message: `Welcome in TODOSTACK API `,
            timestamp: new Date().toISOString()
        })
    })

    const twoMinutesLater = new Date(Date.now() + 2 * 60 * 1000);
    console.log(twoMinutesLater.toISOString());

    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/tags', tagRouter)
    app.use('/api/v1/todo', todoRouter) // ← includes nested reminders





    app.use((req, res) => {
        res.status(404).json({
            status: "fail",
            message: `${req.originalUrl} not found`,
            timestamp: new Date().toISOString()
        })
    })



    app.use(globalErrorHandling)


    app.listen(port, () => console.log(`Example app listening on port ${port}!`))


}