function autonomousAction(decision) {
  if (!decision.should_reorder) {
    return {
      action_taken: false,
      reason: "Stock sufficient"
    };
  }

  return {
    action_taken: true,
    action_type: "REORDER",
    medicine_id: decision.medicine_id,
    quantity: decision.recommended_order_quantity,
    status: "Reorder initiated (mock)"
  };
}

module.exports = { autonomousAction };
