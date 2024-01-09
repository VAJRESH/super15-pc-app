import styles from "./loader.module.css";

// https://loading.io/css/
export default function Loader({ isFullPage = false, opacity = "0.3" }) {
  return (
    <>
      <div
        className={`${styles.loader} ${isFullPage ? styles.fullPage : ""}`}
        style={{ opacity }}
      >
        <div className={`${styles.ldsSpinner}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
