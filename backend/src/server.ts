import app from './app';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3001;

app.start(PORT);
