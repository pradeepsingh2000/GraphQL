import users from "../Models/user.model.js"
import bcrypt from "bcryptjs"

const userResolver = {
    Query: {
        authUser : async (_,__,{context}) => {
            try {
                const user = await context.getUser();
                return user;
            }
            catch (e) {
                console.log(e);
            }
        },
        user: async(_,{userId}) => {
            try {
                const user = await users.findById(userId);
                return user;
            }catch (e) {
                console.log(e);
            }
        }
    },
    Mutation: {
        signUp: async (_,{input},context) => {
            try{
                const {username,name,password,gender} = context
                if(!username || !password || !gender || !name) {
                    throw new Error("Please enter all required fields")
                }
                const isUser = await users.findOne({username})
                if(isUser) {
                    throw new Error("User already exists")
                }
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hashPassword(password,salt)
                const newUser = new users ( {
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                    profilePicture:"https://avatar.iran.liara.run/public/46"
                })
                await newUser.save();
                await context.login(newUser)
                return newUser;
            }
            catch(err) {
                console.log(err,'the  Error')
                throw new Error(err.message || "Internal Server Error")
            }
        },
        login: async (_,{input},context) => {
            try {
                const {username, password} = context
                const {user} = await context.authenticate("graphql-local",{username , password})
                await context.login(username, password)
                return user
            }catch(err) {
                console.log(err,'the Error')
            }
     
        },
        logout : async(_,__,context) => {
            try {
                await context.logout()
                req.session.destroy((err) => {
                    if(err) throw err;
                });
                res.clearCookies("connect._sid");
                return { message : "Logged out successfully"}
            }
            catch(err) {
                console.log(err,'the Error')
            }
        }
    }
}

export default userResolver