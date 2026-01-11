const functions = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { FieldValue } = require("firebase-admin/firestore");
const { validateOrderLogic } = require("./validateOrder");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

exports.placeOrder = functions.onRequest(async (req, res) => {
  try {
    console.log("STEP 1: method =", req.method);
    console.log("STEP 2: raw body =", req.body);

    if (req.method !== "POST") {
      return res.status(405).json({ approved: false, reason: "Method not allowed" });
    }

    if (!req.body) {
      return res.status(400).json({ approved: false, reason: "Missing body" });
    }

    const order = req.body;
    console.log("STEP 3: order parsed =", order);

    const decision = validateOrderLogic(order);
    console.log("STEP 4: validation decision =", decision);

    if (!decision.approved) {
      return res.status(400).json(decision);
    }

    console.log("STEP 5: writing to Firestore");

    const docRef = await db.collection("orders").add({
      user_id: order.user_id,
      medicine_id: order.medicine.medicine_id,
      quantity: order.quantity,
      dosage: order.dosage,
      date: FieldValue.serverTimestamp()
    });

    console.log("STEP 6: write success, id =", docRef.id);

    return res.status(200).json({
      approved: true,
      order_id: docRef.id,
      message: "Order placed successfully"
    });

  } catch (err) {
    console.error("❌ RUNTIME ERROR:", err);
    return res.status(500).json({
      approved: false,
      reason: "Internal server error"
    });
  }
});
