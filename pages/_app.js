import Head from "next/head";
import "../styles/globals.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/structure.css"; // Remove if nothing is visible

/* Optional CSS utils that can be commented out */
import Layout from "@/components/Layout";
import OfflineScreen from "@/screens/OfflineScreen";
import { App as CapacitorApp } from "@capacitor/app";
import { IonApp, setupIonicReact } from "@ionic/react";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import AuthChecker from "../components/AuthChecker";
import NonSSRWrapper from "../components/NonSSRWrapper";

setupIonicReact();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // https://stackoverflow.com/a/69084017
    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>Super 15</title>
        <meta name="description" content="Quiz App" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/images/Super15 Logo.png" />
      </Head>

      <OfflineScreen />

      <NonSSRWrapper>
        <RecoilRoot>
          <IonApp>
            <Layout>
              <AuthChecker>
                <Component {...pageProps} />
              </AuthChecker>
            </Layout>
          </IonApp>
        </RecoilRoot>
      </NonSSRWrapper>
    </>
  );
}

export default MyApp;
