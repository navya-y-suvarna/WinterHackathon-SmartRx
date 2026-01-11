const { personalizeUser } = require("./personalizeUser");

const orders = [
  {
    user_id: "U001",
    medicine_id: "MED001",
    quantity: 30,
    dosage: 1,
    purchase_date: "2025-12-15"
  },
  {
    user_id: "U001",
    medicine_id: "MED001",
    quantity: 30,
    dosage: 1,
    purchase_date: "2026-01-15"
  },
  {
    user_id: "U001",
    medicine_id: "MED001",
    quantity: 30,
    dosage: 1,
    purchase_date: "2026-02-15"
  },
  {
    user_id: "U001",
    medicine_id: "MED002",
    quantity: 10,
    dosage: 1,
    purchase_date: "2026-01-20"
  }
];

console.log(personalizeUser(orders));
