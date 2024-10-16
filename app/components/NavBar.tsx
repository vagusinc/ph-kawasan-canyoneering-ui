/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
import { ClientOnly } from "remix-utils/client-only";

import { useDetectScroll } from "~/hooks";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/base-components/ui/sheet";
import { CartSideBar } from "~/layouts";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { CART_ITEMS_KEY } from "~/services";

import shoppingBag from "icons/shopping-bag.svg";
import coloredLogo from "images/logo-colored.png";
import { TCartItem } from "~/types/CartItem";
import { TItemType } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";
import { useNavigate } from "@remix-run/react";

export type TNavBarItems = "home" | "services" | "about us" | "faq";

interface INavBarProps {
  tours: TItemType<TTour>[];
  activeLink: TNavBarItems;
  elevateBackground?: boolean;
  onItemClick?: (section: TNavBarItems) => void;
}

const NavBar = (props: INavBarProps) => {
  const { isSmall } = useDetectScroll();
  const [cartItems] = useLocalStorage<TCartItem[]>(CART_ITEMS_KEY, []);
  const navigate = useNavigate();

  const isElevated = props.elevateBackground || isSmall;

  return (
    <div
      className={`w-screen fixed flex items-center px-8 lg:px-48 py-8 z-50 ${
        isElevated ? "bg-white shadow-lg py-2" : ""
      }`}
    >
      <div
        className={`flex flex-1 items-center gap-8 ${
          isElevated ? "text-black" : "text-white"
        } text-base`}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-8 h-8 md:w-16 md:h-16 rounded-full bg-white overflow-hidden"
        >
          <img
            src={coloredLogo}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span
          className={`${
            props.activeLink === "home" ? "text-primary" : ""
          } cursor-pointer hidden md:block`}
          role="button"
          onClick={() => props.onItemClick?.("home")}
          tabIndex={0}
        >
          Home
        </span>
        <span
          className={`${
            props.activeLink === "services" ? "text-primary" : ""
          } cursor-pointer hidden md:block`}
          role="button"
          onClick={() => props.onItemClick?.("services")}
          tabIndex={0}
        >
          Services
        </span>
        <span
          className={`${
            props.activeLink === "about us" ? "text-primary" : ""
          } cursor-pointer hidden md:block`}
          role="button"
          onClick={() => props.onItemClick?.("about us")}
          tabIndex={0}
        >
          About us
        </span>
        <span
          className={`${
            props.activeLink === "faq" ? "text-primary" : ""
          } cursor-pointer hidden md:block`}
          role="button"
          onClick={() => props.onItemClick?.("faq")}
          tabIndex={0}
        >
          FAQs
        </span>
      </div>
      <div>
        <Sheet>
          <SheetTrigger>
            <div className="relative">
              <img
                src={shoppingBag}
                alt="cart icon"
                className="w-6 h-6 md:w-8 md:h-8"
              />
              <ClientOnly>
                {() => (
                  <>
                    {cartItems.length > 0 && (
                      <div className="absolute -right-1 -bottom-2 h-fit w-fit text-white text-xs bg-primary p-1 px-2 rounded-full">
                        {cartItems.length}
                      </div>
                    )}
                  </>
                )}
              </ClientOnly>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="font-bold text-2xl text-primary">
              Your Cart
            </SheetHeader>
            <CartSideBar tours={props.tours} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export { NavBar };
