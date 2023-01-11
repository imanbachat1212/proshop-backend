import mongoose from "mongoose";
import bcrypt from 'bcryptjs';



const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamps:true
})
 // to give us the mach encrypted  password to the correct email
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
//to encrypt the password before i press to save 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)// hyda li bi alb el data text
    this.password = await bcrypt.hash(this.password, salt)// hon 3mltlo hashing
  })
const User=mongoose.model('User',userSchema)

export default User;