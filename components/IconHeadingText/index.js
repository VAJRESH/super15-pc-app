import styles from "./iconHeadingText.module.css";

function IconHeadingText({ img, heading, data, handleClick = () => {} }) {
  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={styles.iconWrapper}>
        <img src={img || "/images/dashicons_email-alt2.png"} alt="image" />
      </div>
      <div className={styles.textWrapper}>
        <h4>{heading || ""}</h4>
        <p>{data || ""}</p>
      </div>
    </div>
  );
}

export default IconHeadingText;
