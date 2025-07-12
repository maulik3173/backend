import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        index:true,
        lowercase:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    fullname:{
        type: String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,  //cloudinary image url
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video",
        },
    ],
    password:{
        type: String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],
    },
    refreshToken:{
        type: String,
    },
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    })
}

export const USer = mongoose.model("User",userSchema)

// what is jwt?
// JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted. JWTs are commonly used for authentication and information exchange in web applications.      
