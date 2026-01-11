function optimizeInventory(input) {
  const {
    medicine_id,
    current_stock,
    average_daily_demand,
    lead_time_days,
    safety_stock
  } = input;

  const reorderPoint =
    average_daily_demand * lead_time_days + safety_stock;

  const shouldReorder = current_stock <= reorderPoint;

  let recommendedOrderQuantity = 0;

  if (shouldReorder) {
    const reviewPeriodDays = 30;
    recommendedOrderQuantity =
      Math.ceil(
        average_daily_demand *
          (lead_time_days + reviewPeriodDays) -
          current_stock
      );
  }

  return {
    medicine_id,
    reorder_point: reorderPoint,
    should_reorder: shouldReorder,
    recommended_order_quantity: Math.max(
      recommendedOrderQuantity,
      0
    )
  };
}

module.exports = { optimizeInventory };
