import styles from "./footer.module.css";

export default function Footer() {
  const links = [
    {
      title: "Terms and Conditions",
      link: "https://super15.in/terms-and-conditions/",
    },
    {
      title: "Privacy Policy",
      link: "https://super15.in/privacy-policy/",
    },
    {
      title: "Refund Policy",
      link: "https://super15.in/refund-policy/",
    },
    {
      title: "Withdrawal Policy",
      link: "https://super15.in/withdrawal-policy/",
    },
  ];

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
