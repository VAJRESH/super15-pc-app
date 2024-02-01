import { LocalNotifications } from "@capacitor/local-notifications";
import { DEFAULTS, QUESTION_TIMES } from "./constants.helper";
import { getFormatedDate } from "./utils.helper";

export async function scheduleNotifications() {
  const notifications =
    (await LocalNotifications?.getPending())?.notifications || [];
  console.log("notifications", notifications, !!notifications?.length);
  if (!!notifications?.length) return;

  const quizStartTime = new Date(
    `${getFormatedDate()}T${DEFAULTS?.quizStartTime}`,
  ).getTime();
  let totalTime = 0;

  QUESTION_TIMES?.slice(0, 10)?.forEach((question) => {
    const timeToEnd = question.timeLimit - 5 * 60 * 1000; // 5 minutes before time end
    const notificationTime = new Date(quizStartTime + timeToEnd + totalTime);
    totalTime += question.timeLimit;

    console.log(
      "Notif",
      question,
      question?.questionNumber,
      timeToEnd,
      notificationTime,
      totalTime,
    );

    const notification = {
      id: question.questionNumber,
      title: `Question ${question.questionNumber} Reminder`,
      body: `Time is running out! Answer quickly. Only ${
        question.cuttOff ?? 5
      } seconds left!`, // Use cuttOff if provided, else default to 5 seconds
      schedule: {
        at: notificationTime,
        repeats: false,
      },
    };

    LocalNotifications?.schedule({ notifications: [notification] });
  });
}

export async function requestPermissions() {
  const permissions = await LocalNotifications.checkPermissions();
  console.log("checkPermissions result:", permissions);
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
