function validateOrderLogic(order) {
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

module.exports = { validateOrderLogic };
