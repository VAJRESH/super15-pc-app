package com.super15;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    // https://razorpay.com/docs/payments/payment-gateway/capacitor-integration/build-integration/#13-add-checkout-class-in-mainactivityjava-android-only
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        registerPlugin(Checkout.class);
    }
}
