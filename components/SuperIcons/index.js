import styles from "./superIcons.module.css";

function SuperIcons({ qSeq = 0 }) {
  const n = 15;
  const m = +qSeq;
  return (
    <>
      <div className={styles.iconsrow}>
        {[...Array(n)].map((e, i) => {
          if (i > 9) {
            if (i < m) {
              return (
                <span key={i}>
                  <img
                    className={styles.star}
                    src="/images/Star lighted.png"
                    alt="sl"
                  />
                </span>
              );
            }
            return (
              <span key={i}>
                <img
                  className={styles.star}
                  src="/images/Star dim.png"
                  alt="sd"
                />
              </span>
            );
          } else {
            if (i < m) {
              return (
                <span key={i}>
                  <img
                    className={styles.circle}
                    src="/images/Circle lighted.png"
                    alt="cl"
                  />
                </span>
              );
            }
            return (
              <span key={i}>
                <img
                  className={styles.circle}
                  src="/images/Circle dim.png"
                  alt="cd"
                />
              </span>
            );
          }
        })}
      </div>
    </>
  );
}

export default SuperIcons;
