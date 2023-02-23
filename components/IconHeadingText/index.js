import styles from "./iconHeadingText.module.css";

function IconHeadingText({ img, heading, data }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <img src={img || "/images/dashicons_email-alt2.png"} alt="image" />
      </div>
      <div className={styles.textWrapper}>
        <h4>{heading || "Some Heading"}</h4>
        <p>{data || "some data goes here"}</p>
      </div>
    </div>
  );
}

export default IconHeadingText;
