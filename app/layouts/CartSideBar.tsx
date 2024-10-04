import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/base-components/ui/select";
import { Button, Counter } from "~/components";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import {
  getAddonOptiosnFromTour,
  getAddonsTotalPriceFromCartItem,
  getPickupAndDropoffOptionsFromTour,
  getPickupAndDropoffPrice,
} from "~/lib/utils";
import { CART_ITEMS_KEY } from "~/services";
import { TCartItem } from "~/types/CartItem";
import { TItemType } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";

import deleteIcon from "icons/trash.svg";
import { useNavigate } from "@remix-run/react";

interface ICartSideBarProps {
  tours: TItemType<TTour>[];
}

const MEET_ONSITE = "Meet on-site";

const CartSideBar = ({ tours }: ICartSideBarProps) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useLocalStorage<TCartItem[]>(
    CART_ITEMS_KEY,
    []
  );

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const tourPriceTotal = item.pricePerPax * item.quantity;

      const pickupAndDropoffTotal =
        item.pickupAndDropoff?.price * item.pickupAndDropoff?.quantity;

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

  const handleTourQuantityChange = (newQuantity: number, tourIndex: number) => {
    const newCartItems = [...cartItems];
    newCartItems[tourIndex] = {
      ...newCartItems[tourIndex],
      quantity: newQuantity,
    };
    setCartItems(newCartItems);
  };

  const handlePickupAndDropoffChange = (
    newPickupAndDropoff: string,
    tourIndex: number
  ) => {
    const tour = tours.find(
      (t) => t.attributes.name === cartItems[tourIndex].tourName
    );
    const newCartItems = [...cartItems];

    if (!tour) return;

    if (newPickupAndDropoff === MEET_ONSITE) {
      newCartItems[tourIndex] = {
        ...newCartItems[tourIndex],
        pickupAndDropoff: {
          quantity: 1,
          name: newPickupAndDropoff,
          price: 0,
        },
      };
      setCartItems(newCartItems);
      return;
    }

    const price = getPickupAndDropoffPrice(
      tour,
      newPickupAndDropoff,
      newCartItems[tourIndex].pickupAndDropoff.quantity
    );

    newCartItems[tourIndex] = {
      ...newCartItems[tourIndex],
      pickupAndDropoff: {
        ...newCartItems[tourIndex].pickupAndDropoff,
        name: newPickupAndDropoff,
        price,
      },
    };

    setCartItems(newCartItems);
  };

  const handlePickupAndDropoffQuantityChange = (
    newQuantity: number,
    tourIndex: number
  ) => {
    const newCartItems = [...cartItems];
    newCartItems[tourIndex] = {
      ...newCartItems[tourIndex],
      pickupAndDropoff: {
        ...newCartItems[tourIndex].pickupAndDropoff,
        quantity: newQuantity,
      },
    };

    const tour = tours.find(
      (t) => t.attributes.name === newCartItems[tourIndex].tourName
    );

    if (!tour) return;

    const price = getPickupAndDropoffPrice(
      tour,
      newCartItems[tourIndex].pickupAndDropoff.name,
      newQuantity
    );

    newCartItems[tourIndex] = {
      ...newCartItems[tourIndex],
      pickupAndDropoff: {
        ...newCartItems[tourIndex].pickupAndDropoff,
        quantity: newQuantity,
        price,
      },
    };

    setCartItems(newCartItems);
  };

  const handleAddAddon = (tourIndex: number) => {
    const newCartItems = [...cartItems];

    const addonOptions = getAddonOptiosnFromTour(
      tours,
      newCartItems[tourIndex].tourName
    );

    const remainingOptions = addonOptions.filter(
      (aOpt) =>
        !newCartItems[tourIndex].addons
          ?.map((a) => a.name)
          ?.includes(aOpt.attributes.name)
    );

    if (!remainingOptions || remainingOptions.length === 0) return;

    const newAddons = [
      ...(newCartItems[tourIndex].addons || []),
      {
        name: remainingOptions.at(0)!.attributes.name,
        price: remainingOptions.at(0)!.attributes.pricePerPerson,
        pax: 1,
      },
    ];

    newCartItems[tourIndex].addons = newAddons;

    setCartItems(newCartItems);
  };

  const handleRemoveAddon = (tourIndex: number, addonIndex: number) => {
    const newCartItems = [...cartItems];

    const newAddons = newCartItems[tourIndex]?.addons?.filter(
      (addon, index) => index !== addonIndex
    );
    newCartItems[tourIndex].addons = newAddons;

    setCartItems(newCartItems);
  };

  const handleAddonChange = (
    newAddon: string,
    tourIndex: number,
    addonIndex: number
  ) => {
    const newCartItems = [...cartItems];

    const addonOptions = getAddonOptiosnFromTour(
      tours,
      newCartItems[tourIndex].tourName
    );

    const newOption = addonOptions.find(
      (addon) => addon.attributes.name === newAddon
    );

    if (!newOption) return;

    newCartItems[tourIndex].addons[addonIndex] = {
      ...newCartItems[tourIndex].addons?.[addonIndex],
      name: newOption.attributes.name,
      price: newOption.attributes.pricePerPerson,
    };

    setCartItems(newCartItems);
  };

  const handleAddonQuantityChange = (
    newQuantity: number,
    tourIndex: number,
    addonIndex: number
  ) => {
    const newCartItems = [...cartItems];

    newCartItems[tourIndex].addons[addonIndex] = {
      ...newCartItems[tourIndex].addons?.[addonIndex],
      pax: newQuantity,
    };

    setCartItems(newCartItems);
  };

  const handleRemoveCartItem = (tourIndex: number) => {
    const newCartItems = cartItems.filter((item, index) => index !== tourIndex);
    setCartItems(newCartItems);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="font-bold text-lg text-black">
          No items found in your cart.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 h-full overflow-auto py-8">
      {cartItems.map((item, index) => {
        const productPickupAndDropoffOptions =
          getPickupAndDropoffOptionsFromTour(tours, item.tourName);

        const productAddonOptions = getAddonOptiosnFromTour(
          tours,
          item.tourName
        ).map((option) => option.attributes.name);

        return (
          <div
            key={index}
            className="flex flex-col gap-5 pb-8 border-b border-neutral"
          >
            {/* Tour Heading and Summary */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={item.tourThumbnail}
                  alt="tour-thumbnail"
                  className="h-28 w-28 rounded-md"
                />
                <button
                  className="absolute -right-1 -top-2"
                  onClick={() => handleRemoveCartItem(index)}
                >
                  <div className="h-fit w-fit text-white text-xs bg-primary p-1 px-2 rounded-full">
                    x
                  </div>
                </button>
              </div>
              <div className="flex flex-col">
                <p className="line-clamp-2 font-bold text-lg">
                  {item.tourName}
                </p>
                <p className="text-sm text-neutral">{`${item.quantity} pax`}</p>
                <p className="text-sm text-neutral">
                  {item.pickupAndDropoff.price !== 0
                    ? `Pick-up and drop-off at ${item.pickupAndDropoff.name}`
                    : MEET_ONSITE}
                </p>
                {!!item.addons && item.addons.length !== 0 && (
                  <p className="text-sm text-neutral">With add-ons</p>
                )}
              </div>
            </div>

            {/* Tour Form */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 px-3">
                <div className="flex text-base text-black">
                  <p className="flex-grow">Number of person:</p>
                  <p>{`₱${item.quantity * item.pricePerPax}`}</p>
                </div>
                <Counter
                  defaultValue={item.quantity}
                  onCounterChange={(count) =>
                    handleTourQuantityChange(count, index)
                  }
                />
              </div>

              <div className="flex flex-col gap-1 px-3">
                <div className="flex text-base text-black">
                  <p className="flex-grow">Pick-up and drop-off:</p>
                  <p>
                    {item.pickupAndDropoff.price !== 0
                      ? `₱${
                          item.pickupAndDropoff.price *
                          item.pickupAndDropoff.quantity
                        }`
                      : "FREE"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Select
                    onValueChange={(value) => {
                      handlePickupAndDropoffChange(value, index);
                    }}
                    value={item.pickupAndDropoff.name}
                  >
                    <SelectTrigger className="flex-grow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={MEET_ONSITE}>
                          {MEET_ONSITE}
                        </SelectItem>
                        {productPickupAndDropoffOptions.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {item.pickupAndDropoff.name !== MEET_ONSITE && (
                    <Counter
                      defaultValue={item.pickupAndDropoff.quantity}
                      onCounterChange={(count) =>
                        handlePickupAndDropoffQuantityChange(count, index)
                      }
                    />
                  )}
                </div>
              </div>

              {/* ADD ONS */}
              <div className="flex flex-col gap-1 px-3">
                <div className="flex text-base text-black mb-1">
                  <div className="flex flex-grow items-center gap-2">
                    <p>Add-ons:</p>
                    <button
                      className="bg-primary p-0.5 px-2.5 rounded-full text-white text-base hover:bg-primary-600"
                      onClick={() => handleAddAddon(index)}
                    >
                      +
                    </button>
                  </div>
                  {item.addons && (
                    <p>{`₱${getAddonsTotalPriceFromCartItem(item.addons)}`}</p>
                  )}
                </div>

                {!item.addons ||
                  (item.addons.length === 0 && <p>No add-ons selected.</p>)}

                {item.addons?.map((addon, addonIndex) => (
                  <div key={addonIndex} className="flex gap-2 items-center">
                    <Select
                      onValueChange={(value) => {
                        handleAddonChange(value, index, addonIndex);
                      }}
                      value={addon.name}
                    >
                      <SelectTrigger className="flex-grow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {productAddonOptions.map((option, optionIndex) => (
                            <SelectItem
                              key={optionIndex}
                              value={option}
                              disabled={item.addons
                                ?.map((a) => a.name)
                                .includes(option)}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Counter
                      defaultValue={addon.pax}
                      onCounterChange={(count) =>
                        handleAddonQuantityChange(count, index, addonIndex)
                      }
                    />
                    <button
                      onClick={() => handleRemoveAddon(index, addonIndex)}
                    >
                      <img src={deleteIcon} alt="delete" className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* TOTAL PRICE */}
      <div className="flex items-center text-lg text-black ">
        <p className="flex-grow">Total: </p>
        <p className="font-bold">{`₱${totalPrice}`}</p>
      </div>

      <Button className="w-full" onClick={() => navigate("/checkout")}>
        CHECKOUT
      </Button>
    </div>
  );
};

export { CartSideBar };
