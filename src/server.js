import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db';

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

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('Press Ctrl+C to stop the server');
})

