import { useMemo } from "react";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { CART_ITEMS_KEY } from "~/services";
import { TCartItem } from "~/types/CartItem";

const CartSummary = () => {
  const [cartItems] = useLocalStorage<TCartItem[]>(CART_ITEMS_KEY, []);

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

  return (
    <div className="flex flex-col">
      {cartItems.map((item, index) => {
        const tourPrice = item.pricePerPax * item.quantity;

        const pickupAndDropoffPrice =
          item.pickupAndDropoff.price * item.pickupAndDropoff.quantity;

        const addonTotalPrice =
          item.addons?.reduce(
            (addonTotalPrice, addon) =>
              (addonTotalPrice += addon.price * addon.pax),
            0
          ) || 0;

        return (
          <div
            key={index}
            className="flex flex-col gap-1 mb-8 border-b border-black py-5"
          >
            <div className="flex mb-5">
              <img
                src={item.tourThumbnail}
                alt="tour-thumbnail"
                className="h-28 w-28 rounded-md mr-4"
              />
              <div className="flex flex-col flex-grow">
                <p className="line-clamp-2 font-bold text-lg">
                  {item.tourName}
                </p>
                <p className="text-sm text-neutral">{`${item.quantity} pax`}</p>
              </div>
              <p className="font-bold text-lg text-black">{`₱${tourPrice}`}</p>
            </div>

            <div className="flex">
              <p className="flex-grow">Subtotal: </p>
              <p className="font-bold text-lg text-black">{`₱${tourPrice}`}</p>
            </div>

            <div className="flex items-center">
              <p className="flex-grow text-sm text-neutral">
                Pick-up and drop-off:{" "}
                <span className="font-bold text-black underline">
                  {item.pickupAndDropoff.name}
                </span>
              </p>
              <p className="font-bold text-lg text-black">
                {pickupAndDropoffPrice ? `₱${pickupAndDropoffPrice}` : "FREE"}
              </p>
            </div>

            <div className="flex items-center">
              <div className="flex flex-col flex-grow">
                <p className="text-sm text-neutral">Add-ons: </p>
                {!item.addons || item.addons?.length === 0 ? (
                  <p className="text-sm text-black pl-4">No add-ons</p>
                ) : (
                  <div className="flex flex-col gap-1 pl-4">
                    {item.addons?.map((addon, index) => (
                      <p key={index}>{addon.name}</p>
                    ))}
                  </div>
                )}
              </div>
              {!item.addons ||
                (item.addons?.length !== 0 && (
                  <p className="font-bold text-lg text-black">
                    {`₱${addonTotalPrice}`}
                  </p>
                ))}
            </div>
          </div>
        );
      })}

      <div className="flex items-center font-bold text-2xl text-black">
        <p className="flex-grow">Total</p>
        <p>{`₱${totalPrice}`}</p>
      </div>
    </div>
  );
};

export { CartSummary };
