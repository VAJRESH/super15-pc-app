import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import Razorpay from "razorpay";
import mysql from "serverless-mysql";

export const razorpayX = require("razorpayx-nodejs-sdk")(
  process.env.RAZOR_PAY_KEY_ID,
  process.env.RAZOR_PAY_SECRET_KEY,
);

export const db = mysql({
  config: {
    host: "109.106.254.1",
    user: "u169097824_super15",
    password: "SkylineMeridian@2024",
    database: "u169097824_Super15",
  },
});

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);

    await db.end();

    return results;
  } catch (error) {
    return { error };
  }
}

export function parseJson(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return "";
  }
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET_KEY,
});

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: cert({
        type: "service_account",
        project_id: "temp-365806",
        private_key_id: "109e397da56aa0e04672daed7864506910a2d16b",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDcNfhz70eM/lND\nVy9HXPd6HZzP7rsnPG099sWeOPTBDLLtcks/1yNHJp75RRvpxi8B7JqD2lVxyoKN\nRZO6ZSqLZcSVvTv69GmhfaNCGPbjyfbgz0/f+qeq/voMeoM9Z+F1OCz3Vq1SVHtI\neZc29cmQsUZ21iVoIVbI2tG06KMP0wTJRTXLTBp+wwV2ADfCPkHZ/2sMtJed3JJw\njP80lr8IwakuijKv6S8VtutyZGlB09jaYTiUm+nwg3tBN0/G8ZdOXRXjR3GHcP8w\nNU1bas2c2oBWVUKDqSTnAkKBs2mHJJoPUHL192VTLg3tXvYo1NkV/nKkDl2g7o2Y\na1vRV/VtAgMBAAECggEAAJsxGKfxOhEOK3U0kbKkEho9mbCbeR9tto9fb7t86FYl\nB58lAriQezbplkqWKdXW6x9atTUMlKsHzSSX+Zn4h23g4BT8srNpt10tmKDnIcKR\n0yscRMPUzSqgB25D6Q9IO9wgeuV/xdD/440azowtK/XiTtvxOkDok1Yk4HsJIzdC\ncHN9j5WgV2wf3jGQaI8Caot3medQ8MzQ8hGJw3p4GJ3uQCWggedsn0synTkJnYNi\n6++f6IJxcsQDdFwXkIMlJmv2aW8BgBAjyrbfNTnmPYA3IgytA/s6e544Z0WAlVI/\nlBETC0NVNk+SeNfDpbRoamQ0rZsjNRMJJzKha9RlYQKBgQD/rPAyhJtxflVWGOSa\n7rgaOwO54skz5sQ6Nnl5qb3yDt3lmw6B2sEqEEPwkOjGyOfRh5G8ozZqmx5bmZl7\nPJmMAWVdTK5iaR6mlGCbfn9mrsuB9EyPN7SqB0s51rvEZTITQ30/mHYk81L5HbY3\nJXeYh4vTKQ+ikiTsDcYJtL1r4QKBgQDcfYLBqYN6OdNRf7tVtIrNUsMzTFPnCdtW\nJNC3EEBlRYc/gTXxljqL++PqjruZLVx0H8gE6qGB4Ag5uvFM4kHR+a6G9F1SLwgt\nEKksObUs5SKM9w6jdx90HYFR/cEakEWtQG8gcLePoY0cf90GPZSoEaVAUu9jI0D4\n1GH9JnDbDQKBgQDbhtLKnX+WSEHfZgpLWTMsGoXNgoL9lGPiE8njg7I69zbhoWwo\nZPq8MjETimjD3dbl2oBwtrbPfBbp0Y2t+c9hHgW5wVBt4RJXN0ln2YpsUSMdlvRx\neAQghZi6tbyNGdKQJb+R7kdq3J3elftRiFMS3TdafIQXM2KOaBklVlHaIQKBgQDP\nSCMjwyO6RSB3briDwv32NscRs8Dw46BSpLueTeXsDugt+F/pJU0XCo/ik5qjTzSq\narJUhOueuCmjdC6jE9XC+5JqhtIwj8yE6TPRQtMjSKopkZ0uaa+lLpPDq+Xc/iKy\n1G9kNPMsUTjiwQXddwkI08Xh6dXpAlxzUN5p6biRBQKBgQCTUNDE00PIfEY5qm3r\nDX9ZAl6QAwBfXUtrvVOZNPS+LNY6aEifNxRfqgpHQg9ijU+RHmx77ngGNR6cimMI\n8lU4xnh2/zTYwFvwVYqmQu0+tHzT+QW9dH43/Z9HigrNu/D3Jp6X3vCd71+DXZ2w\nbeMKh2O3vBu/qHHadD/S86xGJg==\n-----END PRIVATE KEY-----\n",
        client_email:
          "firebase-adminsdk-4puol@temp-365806.iam.gserviceaccount.com",
        client_id: "113306892668800409090",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4puol%40temp-365806.iam.gserviceaccount.com",
        universe_domain: "googleapis.com",
      }),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export const adminApp = admin.firestore();
