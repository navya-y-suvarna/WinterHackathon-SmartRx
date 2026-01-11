function personalizeUser(orders) {
  if (!orders || orders.length === 0) {
    return null;
  }

  const medicineMap = {};
  const refillCycles = {};

  // Sort by date
  orders.sort(
    (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date)
  );

  for (let i = 0; i < orders.length; i++) {
    const med = orders[i].medicine_id;

    medicineMap[med] = (medicineMap[med] || 0) + 1;

    if (!refillCycles[med]) {
      refillCycles[med] = [];
    }

    if (i > 0 && orders[i - 1].medicine_id === med) {
      const prev = new Date(orders[i - 1].purchase_date);
      const curr = new Date(orders[i].purchase_date);

      const diffDays = Math.floor(
        (curr - prev) / (1000 * 60 * 60 * 24)
      );

      refillCycles[med].push(diffDays);
    }
  }

  // Frequent medicines (ordered more than once)
  const frequentMedicines = Object.keys(medicineMap).filter(
    med => medicineMap[med] >= 2
  );

  // Average refill cycle
  const avgRefillCycle = {};
  for (const med in refillCycles) {
    const cycles = refillCycles[med];
    if (cycles.length > 0) {
      avgRefillCycle[med] =
        Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length);
    }
  }

  // Chronic usage: ordered 3 or more times
  const chronicMedicines = Object.keys(medicineMap).filter(
    med => medicineMap[med] >= 3
  );

  return {
    frequent_medicines: frequentMedicines,
    average_refill_cycle_days: avgRefillCycle,
    chronic_medicines: chronicMedicines,
    order_count: orders.length
  };
}

module.exports = { personalizeUser };
