import { SUBSCRIBTIONS } from "@/helper/constants.helper";

export default function RazorpayForm({ options = {}, btnRef = null }) {
  return (
    <>
      <form
        method="POST"
        action="https://api.razorpay.com/v1/checkout/embedded"
        style={{ margin: "-100px" }}
      >
        <input type="hidden" name="key_id" value={options?.key} />
        <input type="hidden" name="amount" value={options?.amount} />
        <input type="hidden" name="order_id" value={options?.orderId} />
        <input type="hidden" name="name" value={options?.name} />
        <input type="hidden" name="currency" value={options?.currency} />
        <input type="hidden" name="description" value={options?.description} />
        <input
          type="hidden"
          name="prefill[name]"
          value={options?.prefillName}
        />
        <input
          type="hidden"
          name="prefill[contact]"
          value={options?.prefillPhoneNumber}
        />
        <input
          type="hidden"
          name="prefill[email]"
          value={options?.prefillEmail}
        />
        <input
          type="hidden"
          name="callback_url"
          value={SUBSCRIBTIONS?.successUrl}
        />
        <input
          type="hidden"
          name="cancel_url"
          value={SUBSCRIBTIONS?.failureUrl}
        />
        <button ref={btnRef}>Submit</button>
      </form>
    </>
  );
}
