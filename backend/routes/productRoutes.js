router.get("/", (req, res) => {
  res.json([
    { name: "Chocolate Cake", price: 500 },
    { name: "Strawberry Pastry", price: 150 }
  ]);
});