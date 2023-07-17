// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.update_presence = onRequest(async (req, res) => {
  const name = req.query.name;
  const course = req.query.course;
  const section = req.query.section;
  const photoURL = req.query.photoURL;

  logger.info(`${name} presence updated`);
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection(`chats/${course}/${section}/room/users`)
    .add({ name: name, photoURL: photoURL });
  // Send back a message that we've successfully written the message
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});