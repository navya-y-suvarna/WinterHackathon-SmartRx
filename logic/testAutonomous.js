const { autonomousAction } = require("./autonomousAction");

const decision = {
  medicine_id: "MED001",
  should_reorder: true,
  recommended_order_quantity: 25
};

console.log(autonomousAction(decision));
