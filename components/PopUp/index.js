import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function PopUp({
  children = null,
  trigger = null,
  isOpen = null,
  overlayStyle = {},
  contentStyle = {},
}) {
  return (
    <>
      <Popup
        open={isOpen}
        trigger={trigger}
        position="center center"
        overlayStyle={{
          backgroundColor: "transparent",
          ...(overlayStyle || {}),
        }}
        contentStyle={{ margin: "0", ...(contentStyle || {}) }}
      >
        {children}
      </Popup>
    </>
  );
}
