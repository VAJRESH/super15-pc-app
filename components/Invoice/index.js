import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: "13px",
  },
  container: {
    padding: "10px",
    width: "100%",
    maxWidth: "500px",
    margin: "auto",
  },
  header: {
    textAlign: "right",
    fontWeight: "bold",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: "10px",
    padding: "5px 10px",
    margin: "20px 10px",
    flexDirection: "row",
    width: "100%",
    gap: "20px",
  },
  sectionContent: {
    marginLeft: "25%",
  },
  disclaimer: {
    margin: "30px 0px",
  },
  bold: {
    fontWeight: "bold",
  },
  normal: {
    fontWeight: "normal",
  },
});

export default function Invoice({
  invoiceId = "",
  amountInINR = 0,
  paidOn = new Date().toDateString(),
  renewOn = new Date().toDateString(),
  paidTo = "",
  transactionId = "",
  billingDetails = {},
}) {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} wrap>
          <View style={styles.container}>
            <Text style={styles.header}>Invoice {invoiceId}</Text>

            <View style={styles.sectionHeader}>
              <View style={{ flexDirection: "column" }}>
                <Image
                  src="/images/Super15 Logo.png"
                  style={{ height: "100px", margin: "auto" }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold", lineHeight: "1.5px" }}>
                  Super15 Monthly Subscription
                </Text>
                <Text style={{ fontSize: "15px", lineHeight: "1.5px" }}>
                  Amount: {amountInINR} INR /-
                </Text>
                <Text>PAID (Renew on {renewOn})</Text>
              </View>
            </View>

            <View>
              <Text>Dear Customer,</Text>
              <Text>
                Thank you for subscribing to Super15. You can now participate in
                our daily quizzes and win cash prizes.
              </Text>

              <Text style={{ margin: "10px 0px" }}>
                Here are the details of your purchase:
              </Text>
              <View style={styles.sectionContent}>
                <Text style={styles.bold}>
                  Application:
                  <Text style={styles.normal}> Super15</Text>
                </Text>
                <Text style={styles.bold}>
                  Paid To:
                  <Text style={styles.normal}> {paidTo}</Text>
                </Text>
                <Text style={styles.bold}>
                  Date: <Text style={styles.normal}> {paidOn}</Text>
                </Text>
                <Text style={styles.bold}>
                  Amount Paid:{" "}
                  <Text style={styles.normal}>
                    {amountInINR} INR /- (Inclusive of all taxes)
                  </Text>
                </Text>
                <Text style={styles.bold}>
                  Payment Method:<Text style={styles.normal}> UPI</Text>
                </Text>
                <Text style={styles.bold}>
                  Transaction Id:
                  <Text style={styles.normal}> {transactionId}</Text>
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: "row",
                  margin: "10px",
                }}
              >
                <Text style={{ flexDirection: "column" }}>
                  Billing Details:
                </Text>
                <View style={{ flexDirection: "column" }}>
                  <Text>{billingDetails?.name}</Text>
                  <Text>{billingDetails?.address}</Text>
                  <Text>{billingDetails?.contact}</Text>
                </View>
              </View>

              <Text style={{ margin: "20px 0px" }}>
                Your subscription will last till {renewOn}
              </Text>
              <Text>Sincerely,</Text>
              <Text>Super15 Team</Text>
            </View>

            <View style={styles.disclaimer}>
              <Text style={styles.bold}>Disclaimer:</Text>
              <View style={{ margin: "10px" }}>
                <Text>
                  - Super15 is an application owned by BS SOBHA SUPERTECH PVT
                  LTD, Ganesh Colony, Pune, India – 411038.
                </Text>
                <Text>
                  - For any queries, you can email us on -
                  <Text style={{ textDecoration: "underline" }}>
                    sobhasuper15@gmail.com
                  </Text>
                </Text>
                <Text>
                  - For details terms and conditions please visit our website -
                  <Text style={{ textDecoration: "underline" }}>
                    https://super15.in/
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
}
