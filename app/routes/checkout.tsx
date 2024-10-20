import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { json, useLoaderData, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils/client-only";

import { getTours } from "~/.server/api/tours";
import { FormInput, NavBar, TNavBarItems } from "~/components";
import { axiosClient } from "~/config";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { CartSummary, Footer } from "~/layouts";
import { isNullOrEmpty } from "~/lib/utils";
import { CART_ITEMS_KEY, CUSTOMER_RESERVATION_FORM_KEY } from "~/services";
import { TCartItem } from "~/types/CartItem";
import { TCustomerReservationForm } from "~/types/CustomerReservationForm";

export const loader = async () => {
  const [tours] = await Promise.all([getTours()]);

  return json({
    tours: tours?.data || [],
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
  });
};

export default function Checkout() {
  const { tours, paypalClientId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [cartItems, _, removeCart] = useLocalStorage<TCartItem[]>(
    CART_ITEMS_KEY,
    []
  );
  const [
    customerReservationForm,
    setCustomerReservationForm,
    removeCustomerReservationForm,
  ] = useLocalStorage<TCustomerReservationForm>(CUSTOMER_RESERVATION_FORM_KEY, {
    guestName: "",
    accomodation: "",
    contact: "",
    emaillAddress: "",
    eta: "",
  });

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const tourPriceTotal = item.pricePerPax * item.quantity;

      const pickupAndDropoffTotal = item.pickupAndDropoff?.price;

      const addonsTotal = item.addons
        ? item.addons.reduce(
            (addonTotal, addon) => (addonTotal += addon.price * addon.pax),
            0
          )
        : 0;

      const totalTourExpense =
        tourPriceTotal + pickupAndDropoffTotal + addonsTotal;

      return (total += totalTourExpense);
    }, 0);
  }, [cartItems]);

  const handleSendCustomerData = async (
    customerData: TCustomerReservationForm
  ) => {
    if (
      isNullOrEmpty(customerData.guestName) ||
      isNullOrEmpty(customerData.contact) ||
      isNullOrEmpty(customerData.accomodation) ||
      isNullOrEmpty(customerData.eta) ||
      isNullOrEmpty(customerData.emaillAddress)
    ) {
      return;
    }

    try {
      const response = await axiosClient.post("/customer-reservation-forms", {
        data: {
          guestName: customerData.guestName,
          contact: customerData.contact,
          accomodation: customerData.accomodation,
          emailAddress: customerData.emaillAddress,
          ETA: customerData.eta,
        },
      });

      navigate("/complete-checkout");
      removeCart();
      removeCustomerReservationForm();
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="flex flex-col md:flex-row h-auto px-8 md:px-12 lg:px-48 py-40 z-10">
        <div className="md:basis-1/2 flex-shrink-0 h-full md:border-r md:border-black md:pr-8">
          <p className="font-bold text-xl text-black mb-5">Reservation Form</p>
          <div className="flex flex-col gap-3 mb-16">
            <FormInput
              required
              label="Lead Guest Name: "
              value={customerReservationForm.guestName}
              onChange={(newValue) => {
                setCustomerReservationForm({
                  ...customerReservationForm,
                  guestName: newValue,
                });
              }}
            />
            <FormInput
              required
              value={customerReservationForm.contact}
              label="WhatsApp / Line / KakaoTalk / iMessage:"
              onChange={(newValue) => {
                setCustomerReservationForm({
                  ...customerReservationForm,
                  contact: newValue,
                });
              }}
            />
            <FormInput
              required
              value={customerReservationForm.accomodation}
              label="Accomodation: "
              onChange={(newValue) => {
                setCustomerReservationForm({
                  ...customerReservationForm,
                  accomodation: newValue,
                });
              }}
            />
            <FormInput
              required
              value={customerReservationForm.eta}
              label="Estimated Time Of Arrival (ETA): "
              onChange={(newValue) => {
                setCustomerReservationForm({
                  ...customerReservationForm,
                  eta: newValue,
                });
              }}
            />
            <FormInput
              required
              value={customerReservationForm.emaillAddress}
              label="Email Address: "
              subTitle="You will receive an email notification from us once reservation is confirmed."
              onChange={(newValue) => {
                setCustomerReservationForm({
                  ...customerReservationForm,
                  emaillAddress: newValue,
                });
              }}
            />
          </div>

          <ClientOnly>
            {() => (
              <>
                {!!paypalClientId && totalPrice > 0 && (
                  <PayPalScriptProvider
                    options={{
                      clientId: paypalClientId,
                      currency: "PHP",
                    }}
                  >
                    <PayPalButtons
                      disabled={
                        isNullOrEmpty(customerReservationForm.guestName) ||
                        isNullOrEmpty(customerReservationForm.contact) ||
                        isNullOrEmpty(customerReservationForm.accomodation) ||
                        isNullOrEmpty(customerReservationForm.eta) ||
                        isNullOrEmpty(customerReservationForm.emaillAddress)
                      }
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: "CAPTURE",
                          purchase_units: [
                            {
                              amount: {
                                value: `${totalPrice}`,
                                currency_code: "PHP",
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const order = await actions.order?.capture();
                        return new Promise(() => {
                          const reservationFormString = localStorage.getItem(
                            CUSTOMER_RESERVATION_FORM_KEY
                          );
                          const reservationForm = reservationFormString
                            ? (JSON.parse(
                                reservationFormString
                              ) as TCustomerReservationForm)
                            : undefined;

                          if (!reservationForm) return;

                          handleSendCustomerData(reservationForm);
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </>
            )}
          </ClientOnly>
        </div>
        <div className="md:basis-1/2 flex-shrink-0 h-full md:pl-8 overflow-auto">
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
