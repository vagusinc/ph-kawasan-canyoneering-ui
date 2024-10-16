import { format } from "date-fns/format";
import deleteIcon from "icons/trash.svg";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/base-components/ui/select";
import { Button, Counter, DatePicker } from "~/components";
import { useToast } from "~/hooks/use-toast";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { CART_ITEMS_KEY } from "~/services";
import { TCartItem } from "~/types/CartItem";
import { TItemType } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";
import { PhotoSelect } from "./PhotoSelect";
import { VideoSelect } from "./VideoSelect";

interface IProductForm {
  product: TItemType<TTour>;
}

const ProductForm = ({ product }: IProductForm) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useLocalStorage(
    CART_ITEMS_KEY,
    [] as TCartItem[]
  );

  const [tourPax, setTourPax] = useState(1);
  const [pickupAndDropoffPax, setPickupAndDropoffPax] = useState(1);
  const [pickupAndDropoff, setPickupAndDropoff] =
    useState<string>("Meet on-site");
  const [addons, setAddons] = useState<
    { name: string; pax: number; price: number }[]
  >([]);
  const [date, setDate] = useState<Date>();
  const [hasErrorDate, setHasErrorDate] = useState(false);

  const productPrice = useMemo(() => {
    if (!product.attributes.pricePerPerson) {
      return product.attributes?.tour_options?.data.at(0)?.attributes
        .pricePerPerson;
    }

    return product.attributes.pricePerPerson;
  }, [product]);

  const productVideoUrls = useMemo(() => {
    return product.attributes.tour_videos.data.map(
      (video) => video.attributes.videoUrl
    );
  }, [product]);

  const productPhotoUrls = useMemo(() => {
    return product.attributes.tour_images.data.map(
      (video) => video.attributes.url
    );
  }, [product]);

  const productPickupAndDropoffOptions = useMemo(() => {
    return Array.from(
      new Set(
        product.attributes.pickup_and_dropoff_packages.data.map(
          (pad) => pad.attributes.location
        )
      )
    );
  }, [product]);

  const pickupAndDropoffPrice = useMemo(() => {
    const pickupAndDropoffPackage =
      product.attributes.pickup_and_dropoff_packages.data.filter(
        (pkg) => pkg.attributes.location === pickupAndDropoff
      );

    if (!pickupAndDropoffPackage) return 0;

    if (pickupAndDropoffPax === 1) {
      return pickupAndDropoffPackage.at(0)?.attributes.price || 0;
    }

    const pkgPrice = pickupAndDropoffPackage.find(
      (pkg) =>
        pkg.attributes.minimumPersons <= pickupAndDropoffPax &&
        pkg.attributes.maximumPersons >= pickupAndDropoffPax
    );

    if (!pkgPrice) {
      return pickupAndDropoffPackage.at(-1)?.attributes.price || 0;
    }

    return pkgPrice.attributes.price;
  }, [
    pickupAndDropoff,
    pickupAndDropoffPax,
    product.attributes.pickup_and_dropoff_packages,
  ]);

  const addonOptions = useMemo(() => {
    return Array.from(new Set(product.attributes.addons.data));
  }, [product]);

  const handleAddAddon = () => {
    const firstOption = addonOptions
      .filter(
        (option) => !addons.map((a) => a.name).includes(option.attributes.name)
      )
      .at(0);

    if (!firstOption) return;

    setAddons([
      ...addons,
      {
        pax: 1,
        name: firstOption.attributes.name,
        price: firstOption.attributes.pricePerPerson,
      },
    ]);
  };

  const handleAddonValueChange = (value: string, index: number) => {
    const modifiedAddons = [...addons];
    const modifiedAddonPrice =
      addonOptions.find((opt) => opt.attributes.name === value)?.attributes
        .pricePerPerson || 0;
    modifiedAddons[index] = {
      ...modifiedAddons[index],
      name: value,
      price: modifiedAddonPrice,
    };
    setAddons(modifiedAddons);
  };

  const handleAddonPaxChange = (pax: number, index: number) => {
    const modifiedAddons = [...addons];
    modifiedAddons[index] = { ...modifiedAddons[index], pax };
    setAddons(modifiedAddons);
  };

  const handleAddToCart = () => {
    setHasErrorDate(false);

    if (!date) {
      setHasErrorDate(true);
      return;
    }

    const pickupAndDropoffPackage = {
      name: pickupAndDropoff,
      quantity: pickupAndDropoffPax,
      price: pickupAndDropoffPrice,
    };

    const newCartItem: TCartItem = {
      tourName: product.attributes.name,
      tourThumbnail:
        product.attributes.tour_images.data.at(0)?.attributes.url || "",
      pricePerPax: productPrice || 0,
      quantity: tourPax,
      date: format(date, "PPP"),
      pickupAndDropoff: pickupAndDropoffPackage,
      addons,
    };

    cartItems.push(newCartItem);
    setCartItems(cartItems);

    toast({
      title: "Succesfully added to cart",
    });
  };

  // useEffect(() => {
  //   setTourPax(1);
  //   setPickupAndDropoffPax(1);
  //   setPickupAndDropoff(undefined);
  //   setAddons([]);
  //   setDate(undefined);
  //   setHasErrorDate(false);
  // }, [product.id]);

  return (
    <div className="pt-40 px-8 md:px-12 lg:px-40 grid grid-cols-1 md:grid-cols-2 space-y-5 md:space-y-0">
      {productVideoUrls.length !== 0 ? (
        <VideoSelect videoUrls={productVideoUrls} />
      ) : (
        <PhotoSelect imageUrls={productPhotoUrls} />
      )}
      <div className="flex flex-col md:px-8">
        <h1 className="font-bold text-2xl text-black line-clamp-2">
          {product.attributes.name}
        </h1>
        <p className="text-2xl text-primary mb-2">{`₱${productPrice} / person`}</p>
        <div className="space-y-2 mb-6">
          <p className="text-base text-black">Quantity</p>
          <Counter onCounterChange={(count) => setTourPax(count)} />
        </div>

        <div className="space-y-5 mb-8">
          <div className="space-y-2">
            <p className="text-base text-black">Pick-up and drop-off:</p>
            <div className="flex items-center gap-3 w-full lg:w-2/3">
              <Select
                onValueChange={(value) => {
                  setPickupAndDropoff(value);
                }}
                value={pickupAndDropoff}
              >
                <SelectTrigger className="flex-grow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"Meet on-site"}>Meet on-site</SelectItem>
                    {productPickupAndDropoffOptions.map((option, index) => (
                      <SelectItem key={index} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {pickupAndDropoff !== "Meet on-site" && (
                <Counter
                  onCounterChange={(count) => setPickupAndDropoffPax(count)}
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">Add-ons:</p>
              <button
                className="bg-primary p-0.5 px-2.5 rounded-full text-white text-base hover:bg-primary-600"
                onClick={handleAddAddon}
              >
                +
              </button>
            </div>
            {addons.length === 0 && (
              <p className="text-black text-base">No addons added</p>
            )}
            {addons.map((addon, index) => (
              <div key={index} className="flex items-center gap-3 w-full">
                <Select
                  onValueChange={(value) =>
                    handleAddonValueChange(value, index)
                  }
                  value={addon.name}
                >
                  <SelectTrigger className="flex-grow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {addonOptions.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option.attributes.name}
                          disabled={addons
                            .map((a) => a.name)
                            .includes(option.attributes.name)}
                        >
                          {option.attributes.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Counter
                  onCounterChange={(count) =>
                    handleAddonPaxChange(count, index)
                  }
                />
                <button
                  onClick={() =>
                    setAddons(
                      addons.filter((a, addonIndex) => addonIndex !== index)
                    )
                  }
                >
                  <img src={deleteIcon} alt="delete" className="w-8 h-8" />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-base text-black">Date:</p>
            <DatePicker onDateChangeCallback={setDate} />
            {hasErrorDate && (
              <p className="text-xs text-red-500">This field is required</p>
            )}
          </div>
        </div>
        <Button onClick={handleAddToCart}>ADD TO CART</Button>
      </div>
    </div>
  );
};

export { ProductForm };
