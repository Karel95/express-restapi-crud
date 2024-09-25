const express = require("express");
const morgan = require("morgan");

const app = express();

//Settings:
app.set('appName', 'Express App');
app.set("port", process.env.PORT || 3000);
app.set('case sensitive routing', true);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());


let products = [];

//Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/products", (req, res) => {
  res.json(products);
});
app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});
app.put("/products/:id", (req, res) => {
  const newData = req.body; // {name: "product", price: 10}
  const productFound = products.find(function getProduct(product) {
    return product.id === parseInt(req.params.id);
  });
  if (!productFound) return res.status(404).send("Product not found");

  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
  );

  console.log(products);
  res.send("Producto actualizado");
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find(function getProduct(product) {
    return product.id === parseInt(req.params.id);
  });
  if (!productFound) return res.status(404).send("Product not found");
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  console.log(products);
  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find(function getProduct(product) {
    return product.id == req.params.id;
  });
  if (!productFound) return res.status(404).send("Product not found");
  console.log(req.params.id);
  res.json(productFound);
});

//Server
app.listen(app.get('port'));
console.log(`Server ${app.get('appName')} listening on port ${app.get('port')}`);
