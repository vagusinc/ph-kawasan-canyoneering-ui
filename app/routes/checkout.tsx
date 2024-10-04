import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { json, useLoaderData, useNavigate } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

import { getTours } from "~/.server/api/tours";
import { FormInput, NavBar, TNavBarItems } from "~/components";
import { CartSummary, Footer } from "~/layouts";

const initialOptions = {
  clientId:
    "AYjbMPAu40cO3wMEyM_HwM_G5xL3PmynInY7SKjfY_Rg7qOq5SdqboKC81f-r79juI3QiKQ2XSKioCyu",
  currency: "PHP",
  intent: "capture",
};

export const loader = async () => {
  const [tours] = await Promise.all([getTours()]);

  return json({
    tours: tours?.data || [],
  });
};

export default function Checkout() {
  const { tours } = useLoaderData<typeof loader>();

  const navigate = useNavigate();

  const handleNavClick = (section: TNavBarItems) => {
    if (section === "services") return;
    navigate("/", { state: { section } });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <NavBar
        tours={tours}
        activeLink={"services"}
        elevateBackground={true}
        onItemClick={handleNavClick}
      />
      <div className="flex h-auto px-48 py-40">
        <div className="basis-1/2 flex-shrink-0 h-full border-r border-black pr-8">
          <p className="font-bold text-xl text-black mb-5">Reservation Form</p>
          <div className="flex flex-col gap-3 mb-16">
            <FormInput label="Lead Guest Name: " />
            <FormInput label="WhatsApp / Line / KakaoTalk / iMessage:" />
            <FormInput label="Accomodation: " />
            <FormInput label="Estimated Time Of Arrival (ETA): " />
            <FormInput
              label="Email Address: "
              subTitle="You will receive an email notification from us once reservation is confirmed."
            />
          </div>

          {/* <p className="font-bold text-xl text-black mb-3">
            PayPal Guest Checkout
          </p>
          <p className="font-bold text-base text-black mb-5">
            All transactions are secure and encrypted.
          </p>
          <div className="flex flex-col gap-3 mb-12">
            <FormInput label="Card number: " />
            <div className="flex items-center gap-4">
              <div className="basis-1/2">
                <FormInput label="Expiry Date: " />
              </div>
              <div className="basis-1/2">
                <FormInput label="CSC: " />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="basis-1/2">
                <FormInput label="First name: " />
              </div>
              <div className="basis-1/2">
                <FormInput label="Last name: " />
              </div>
            </div>
            <FormInput label="Mobile number: " />
          </div> */}

          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        value: "1",
                        currency_code: "PHP",
                      },
                    },
                  ],
                });
              }}
              //   onApprove={(data, actions) => {
              //     return fetch("", )
              //   }}
            />
          </PayPalScriptProvider>
          {/* <Button className="w-full">Proceed to payment</Button> */}
        </div>
        <div className="basis-1/2 flex-shrink-0 h-full pl-8 overflow-auto">
          <ClientOnly>{() => <CartSummary />}</ClientOnly>
        </div>
      </div>
      <Footer
        tours={tours}
        onAboutUsClicked={() => handleNavClick("about us")}
        onFAQClicked={() => handleNavClick("faq")}
      />
    </div>
  );
}
