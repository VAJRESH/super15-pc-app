import styles from "./formInput.module.css";

export default function FormInput({
  label = "",
  type = "text",
  name = "",
  placeholder = "",
  onIonInput = () => {},
  onIonBlur = () => {},
  disabled = false,
  value = "",
}) {
  return (
    <div className={styles.input}>
      <input
        type={type}
        value={value}
        placeholder={label || " "}
        disabled={disabled}
        onChange={onIonInput}
      />
      <label>{label}</label>
    </div>
  );
}
