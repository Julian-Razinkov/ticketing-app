import mongoose from "mongoose";
import { Password } from "../services/password";


//to get ts correct model properly
interface UserAttrs{
    email:string;
    password:string;
}


//interface that describes that user model has
interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserAttrs):UserDocument;
}

//interface that describes that the user document has
interface UserDocument extends mongoose.Document{
    email:string;
    password:string;
}

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required:true
}
        
}, {
    // Not a best aproachto write view related things in model, but it`ll do the job
    toJSON:{
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done){
    //this function will return true even if value created for the first time
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);


export {User};