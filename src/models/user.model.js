import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUND || 10;

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    }, 
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});


// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
})

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;