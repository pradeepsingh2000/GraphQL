import passport from "passport";
import bcrypt from "bcryptjs";
import users from "../Models/user.model";
import { GraphQLLocalStrategy } from "graphql-passport";


export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("deserialized user");
    try {
      const User = await users.findById(id);
      done(null, User);
    } catch (err) {
      done(err);
    }
  });
  passport.use(
    new GraphQLLocalStrategy(async (username,password, done) => {
        try{
            const user = await users.findOne({username})
            if(!user) {
                throw new Error("Invalid username or password")
            }
            const validPassword = await bcrypt.compare(password,user.password)
            if(!validPassword) {
                throw new Error("Invalid username or password")
            }
            return done(null, user)
        }
        catch (err) {
            done(err)
        }
    })
  );
};
