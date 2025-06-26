import Leaderboard from "@/components/Leaderboard/index";
import SideMenu from "@/components/SideMenu/index";
import useLoadWinners from "@/hooks/useLoadWinners";
import { getLastNWeekStartDates, getFormatedDate } from "@/helper/utils.helper";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuToggle,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { useState } from "react";
import { CurrentUserAtom } from "@/atom/user.atom";
import { useRecoilValue } from "recoil";

export default function Winners() {
  const user = useRecoilValue(CurrentUserAtom);

  // Get last 8 weeks (including this week)
  const weekDates = getLastNWeekStartDates(8).reverse(); // oldest to newest
  const today = getFormatedDate();
  // Only allow selection up to current week (no future weeks)
  const currentWeekIndex = weekDates.findIndex(
    (d) => d === getLastNWeekStartDates(1)[0],
  );
  const availableWeeks = weekDates.slice(0, currentWeekIndex + 1);

  // Helper to format week range label
  function getWeekRangeLabel(startDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const startMonth = months[startDate.getMonth()];
    const endMonth = months[endDate.getMonth()];
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const year = endDate.getFullYear();
    // If week is within the same month
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  }

  const [selectedWeek, setSelectedWeek] = useState(
    availableWeeks[availableWeeks.length - 1],
  );

  // Helper to get all dates in the selected week (Mon-Sun)
  function getAllDatesInWeek(weekStartStr) {
    const dates = [];
    const start = new Date(weekStartStr);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      dates.push(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0",
        )}-${String(d.getDate()).padStart(2, "0")}`,
      );
    }
    return dates;
  }

  const weekQuizIds = getAllDatesInWeek(selectedWeek);
  const { leaderboard } = useLoadWinners(weekQuizIds);

  return (
    <IonSplitPane when="sm" contentId="main-content">
      <SideMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonMenuToggle>
                <IonButton>
                  <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
                </IonButton>
              </IonMenuToggle>
            </IonButtons>
            <IonTitle>Winners</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ marginBottom: 16 }}>
            <IonSelect
              value={selectedWeek}
              placeholder="Select Week"
              onIonChange={(e) => setSelectedWeek(e.detail.value)}
            >
              {weekDates.map((date, idx) => {
                // Disable future weeks
                const isFuture = date > today;
                return (
                  <IonSelectOption key={date} value={date} disabled={isFuture}>
                    {getWeekRangeLabel(date)} {isFuture ? "(Future)" : ""}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </div>
          {/* Hide leaderboard for future weeks */}
          {selectedWeek > today
            ? null
            : weekQuizIds.map((quizId, idx) => (
                <Leaderboard
                  leaderboard={leaderboard?.[quizId]}
                  isAdmin={user?.isAdmin}
                  title={new Date(quizId).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                />
              ))}
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
}
