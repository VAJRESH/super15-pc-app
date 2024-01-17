import mysql from "serverless-mysql";

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
