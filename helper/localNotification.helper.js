import { LocalNotifications } from "@capacitor/local-notifications";

export async function scheduleNotification({
  id = 0,
  title = "",
  body = "",
  at = null,
}) {
  LocalNotifications?.removeAllDeliveredNotifications();
  if (!title || !body || !at) return;

  const notifications =
    (await LocalNotifications?.getPending())?.notifications || [];

  if (notifications?.some((obj) => obj?.id === id)) return;
  const notification = {
    id,
    title,
    body,
    schedule: { at, repeats: false, allowWhileIdle: true },
  };

  LocalNotifications?.schedule({ notifications: [notification] });
}

export async function requestPermissions() {
  const permissions = await LocalNotifications.checkPermissions();
  console.log("checkPermissions result:", JSON.stringify(permissions));
  if (permissions.display !== "granted") {
    const newPermissions = await LocalNotifications.requestPermissions();
    console.log("requestPermissions result:", newPermissions);
    if (newPermissions.display === "denied") {
      // Always ends up here, without showing any notification permission prompt
      alert("Please enable notifications");
      // throw new Error(`No permission to show notifications`);
    }
  }
}
