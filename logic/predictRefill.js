function predictRefill(orders) {
  if (!orders || orders.length === 0) {
    return null;
  }

  // Sort by purchase date (latest first)
  const sorted = orders.sort(
    (a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)
  );

  const latest = sorted[0];

  const daysOfSupply = latest.quantity / latest.dosage;

  const today = new Date();
  const purchaseDate = new Date(latest.purchase_date);

  const daysElapsed = Math.floor(
    (today - purchaseDate) / (1000 * 60 * 60 * 24)
  );

  const daysRemaining = Math.max(
    Math.ceil(daysOfSupply - daysElapsed),
    0
  );

  let urgency = "Low";
  if (daysRemaining <= 5) urgency = "High";
  else if (daysRemaining <= 10) urgency = "Medium";

  return {
    medicine_id: latest.medicine_id,
    days_remaining: daysRemaining,
    refill_needed: daysRemaining <= 10,
    urgency
  };
}

module.exports = { predictRefill };
