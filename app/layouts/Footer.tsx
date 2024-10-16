/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from "@remix-run/react";

import paypal from "images/paypal.png";
import { TItemType } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";

interface IFooterProps {
  tours: TItemType<TTour>[];
  onAboutUsClicked?: () => void;
  onFAQClicked?: () => void;
}

const Footer = (props: IFooterProps) => {
  const navigate = useNavigate();

  const handleProductClicked = (product: TItemType<TTour>) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-primary-200 pt-10 lg:pt-20 px-4 md:px-12 lg:px-0 lg:pl-60 pb-10 flex flex-col gap-10">
      <div className="grid grid-cols-4 grid-rows-2 md:grid-rows-1 lg:grid-rows-0 lg:grid-cols-5">
        <div className="flex flex-col gap-1 px-4 col-span-2 md:col-span-1">
          <p className="font-bold text-base text-black mb-6">Contact Us</p>
          <p className="text-sm text-black">E-mail : sayhicebu@gmail.com</p>
          <p className="text-sm text-black">WhatsApp : +639177221704</p>
          <p className="text-sm text-black">Kakao ID : phkawasancanyo</p>
          <p className="text-sm text-black">line: phkawasan.canyo</p>
        </div>
        <div className="flex flex-col gap-1 px-4 col-span-2 md:col-span-1">
          <p className="font-bold text-base text-black mb-6">Services</p>
          {props.tours.map((tour) => (
            <p
              key={tour.id}
              onClick={() => handleProductClicked(tour)}
              tabIndex={0}
              role="button"
              className="text-sm text-black cursor-pointer hover:underline"
            >
              {tour.attributes.name}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-1 px-4 col-span-2 mt-10 md:mt-0 md:col-span-1">
          <p className="font-bold text-base text-black mb-6">Company</p>
          <p
            onClick={() => props.onAboutUsClicked?.()}
            role="button"
            tabIndex={0}
            className="text-sm text-black cursor-pointer hover:underline"
          >
            About us
          </p>
          <p
            onClick={() => props.onFAQClicked?.()}
            role="button"
            tabIndex={0}
            className="text-sm text-black cursor-pointer hover:underline"
          >
            FAQs
          </p>
        </div>
        <div className="flex flex-col px-4 mt-10 md:mt-0 col-span-2 md:col-span-1 lg:col-span-2">
          <p className="font-bold text-base text-black mb-2">
            Payment Channels
          </p>

          <img src={paypal} alt="paypal" className="w-32 h-32" />
          {/* <div className="flex flex-row items-center gap-4 mt-40">
            <img src={facebook} alt="facebook" className="w-8 h-8" />
            <img src={instagram} alt="instagram" className="w-8 h-8" />
            <img src={tiktok} alt="tiktok" className="w-8 h-8" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export { Footer };
