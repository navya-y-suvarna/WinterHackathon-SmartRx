const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

fs.createReadStream("medicines.csv")
  .pipe(csv())
  .on("data", async (row) => {
    try {
      await db.collection("medicines").add({
        name: row.Name,
        category: row.Category,
        dosage_form: row["Dosage Form"],
        strength: row.Strength,
        manufacturer: row.Manufacturer,
        indication: row.Indication,
        classification: row.Classification,
        medicine_id: row.medicine_id,
        stock_quantity: Number(row.stock_quantity),
        reorder_level: Number(row.reorder_level),
        prescription_required:
          row.Classification !== "Over-the-Counter",
        created_at: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (err) {
      console.error("Error uploading:", err);
    }
  })
  .on("end", () => {
    console.log("✅ CSV upload completed successfully");
  });
