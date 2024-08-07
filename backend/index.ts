import app from './app';

const PORT = 3009;

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
