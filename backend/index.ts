import app from "./app";

const PORT = 3009;

app.get("/", (req, res) => {
  res.send("Letterbox clone API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
