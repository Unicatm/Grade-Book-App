const path = require("path");
const admin = require("firebase-admin");

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase Admin is working!");
} catch (error) {
  console.error("Firebase Admin fails to initialize.");
  console.error(error.message);
  process.exit(1);
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
