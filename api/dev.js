const app = require("./contact");
const port = 3001;

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
