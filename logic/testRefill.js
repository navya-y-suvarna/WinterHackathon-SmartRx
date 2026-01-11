const { predictRefill } = require("./predictRefill");

// const orders = [
//   {
//     user_id: "U001",
//     medicine_id: "MED001",
//     quantity: 30,
//     dosage: 1,
//     purchase_date: "2026-01-01"
//   }
// ];

const orders = [
  {
    user_id: "U001",
    medicine_id: "MED001",
    quantity: 30,
    dosage: 1,
    purchase_date: "2025-12-15"
  }
];


console.log(predictRefill(orders));
