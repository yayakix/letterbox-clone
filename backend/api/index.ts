import app from "../app";

const PORT = process.env.PORT || 3009;

app.get("/", (_req, res) => {
  res.send("Letterbox clone API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
