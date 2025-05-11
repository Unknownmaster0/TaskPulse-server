import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect with database.
try {
    (async () => {
        await connectDB();
        console.log('Connected to database');
    })();
} catch (error) {
    console.log(error.message);
    process.exit(1);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
})

// Handling the routing logic here.
import UserRouter from './routes/user.route.js';
import TaskRouter from './routes/task.route.js';

app.use('/api/user', UserRouter);
app.use('/api/task', TaskRouter);


export default app;