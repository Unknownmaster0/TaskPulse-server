import mongoose from 'mongoose';

// Task model
const taskSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: false,
    }, 
    status: {
        type: String,
        enum: ['To-Do', 'In Progress', 'Completed'],
        default: 'To-Do',
    }, 
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low',
    },
    dueDate: {
        type: Date, 
        required: false,
    }, 
    position: {
        type: Number,
        default: 0,
        required: true,
    }
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
export default Task;