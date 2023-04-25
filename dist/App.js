import express from 'express';
const PORT = 3000;
const app = express();
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
