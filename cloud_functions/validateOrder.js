// validateOrder.js

function evaluateOrder(order) {
  if (!order || !order.medicine) {
    return { approved: false, reason: "Invalid order data" };
  }

  if (order.medicine.prescription_required && !order.prescription_provided) {
    return { approved: false, reason: "Prescription required" };
  }

  if (order.medicine.stock_quantity < order.quantity) {
    return { approved: false, reason: "Insufficient stock" };
  }

  return { approved: true, reason: "Order is safe to proceed" };
}

// Cloud Function
exports.validateOrder = (req, res) => {
  const decision = evaluateOrder(req.body);
  res.json(decision);
};

// 👇 TEMPORARY LOCAL TEST (this is the key)
if (require.main === module) {
  const mockOrder = {
    medicine: {
      prescription_required: true,
      stock_quantity: 50
    },
    quantity: 10,
    prescription_provided: false
  };

  console.log("Decision:", evaluateOrder(mockOrder));
}
