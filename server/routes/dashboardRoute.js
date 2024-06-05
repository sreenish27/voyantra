//Dashboard route - It must have all individual user specific useful details in it
import {app} from '../server.js';

app.get('/dashboard', (req, res) => {
    res.send(`A clear view all your past, present and future trips including spending, places, etc in one place!`);
});