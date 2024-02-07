import { IsLoadingAtom } from "@/atom/global.atom";
import { PlayerHistoryAtom, getHistoryDataObj } from "@/atom/quiz.atom";
import { CurrentUserAtom } from "@/atom/user.atom";
import SideMenu from "@/components/SideMenu";
import { loadUserQuizIds, loadUserQuizMap } from "@/services/queries.services";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonSplitPane,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export default function History() {
  const user = useRecoilValue(CurrentUserAtom);
  const [isLoading, setIsLoading] = useRecoilState(IsLoadingAtom);
  const [historyData, setHistoryData] = useRecoilState(PlayerHistoryAtom);

  const queryDataLimit = 10;

  // load user attempted quiz ids
  useEffect(() => {
    if (!user?.uid) return;
    if (!!historyData?.quizIds?.length) return;

    setIsLoading(true);
    loadUserQuizIds(user?.uid).then((quizIds) => {
      setHistoryData((prev) => getHistoryDataObj({ ...(prev || {}), quizIds }));

      loadPlayerHistory(quizIds?.slice(0, queryDataLimit));
    });
  }, [historyData?.quizIds, user?.uid]);

  async function loadPlayerHistory(quizIdArr = []) {
    if (!quizIdArr?.length) return;
    setIsLoading(true);
    const data = {};

    for (const quizId of quizIdArr) {
      const res = await loadUserQuizMap(user?.uid, quizId);

      data[quizId] = res;
    }

    setIsLoading(false);
    setHistoryData((prev) =>
      getHistoryDataObj({
        ...(prev || {}),
        history: { ...(prev?.history || {}), ...(data || {}) },
      }),
    );
  }

  const quizIds = Object.keys(historyData?.history || {});

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

            <IonItem lines="none">
              <IonLabel>History</IonLabel>
            </IonItem>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <h4>Your Quiz History</h4>

          {!!(!quizIds?.length && !isLoading) && (
            <h6>No Quiz History Found!</h6>
          )}

          <IonGrid>
            {quizIds?.map((quizId) => (
              <IonRow
                keys={quizId}
                style={{
                  borderRadius: "2px",
                  padding: "2px",
                  borderBottom: "1px solid var(--black)",
                  background:
                    historyData?.history?.[quizId]?.[14]?.result === 1
                      ? "var(--success)"
                      : "",
                }}
              >
                <IonCol>{quizId} </IonCol>
                <IonCol size="auto">: </IonCol>
                <IonCol>
                  {historyData?.history?.[quizId]?.length} Questions Attempted
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>

          <IonButton
            onClick={() =>
              loadPlayerHistory(
                historyData?.quizIds?.slice(
                  quizIds?.length,
                  quizIds?.length + queryDataLimit,
                ),
              )
            }
            className="ion-margin"
            expand="full"
            fill="outline"
            shape="round"
            disabled={historyData?.quizIds?.length === quizIds?.length}
          >
            Load More
          </IonButton>
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
}
