import { FOOTER_LINKS } from "@/helper/constants.helper";
import styles from "./footer.module.css";

export default function Footer() {
  const links = Object.values(FOOTER_LINKS);

  return (
    <>
      <div className={styles.footer}>
        {links?.map((link) => (
          <a href={link?.link}>{link?.title}</a>
        ))}
      </div>
    </>
  );
}
