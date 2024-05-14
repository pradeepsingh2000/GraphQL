import mongoose from "mongoose"

const connectDB = () => {
    console.log(process.env.MONGO_URI,'process.env.MONGO_URI')
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Connect to DB  connections host`)
        }).catch((err) => {
            console.log(err)
        });
};

export default connectDB;
