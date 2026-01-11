const { optimizeInventory } = require("./optimizeInventory");

const input = {
  medicine_id: "MED001",
  current_stock: 12,
  average_daily_demand: 1,
  lead_time_days: 7,
  safety_stock: 10
};

console.log(optimizeInventory(input));
