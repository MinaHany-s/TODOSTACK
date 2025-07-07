import mongoose from 'mongoose';

const dbConnection = () => {
    mongoose.connect(process.env.ONLINE_DATABASE).then(() => {
        console.log("Database connected succefully")
    }).catch((err) => {
        console.log(`An error occured ${err.message}`)
    })
}
export default dbConnection;