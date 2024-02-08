import { Network } from "@capacitor/network";
import { useEffect, useState } from "react";
import styles from "./offlineScreen.module.css";

export default function OfflineScreen() {
  const [isOffline, setIsOffline] = useState(null);

  useEffect(() => {
    Network?.getStatus()?.then((status) => setIsOffline(!status?.connected));

    Network?.addListener("networkStatusChange", (status) =>
      setIsOffline(!status?.connected),
    );

    return Network?.removeAllListeners;
  }, []);

  if (!isOffline) return null;

  return (
    <div className={`${styles.offlineScreen}`}>
      <img src="/brand/logo.png" alt="" />

      <div className={`${styles.splashTxt}`}>
        Internet is required to use this application
        <p>Check your Internet Connection</p>
      </div>
    </div>
  );
}
