/* eslint-disable react/display-name */
import { forwardRef } from "react";

const AboutUs = forwardRef<HTMLDivElement, object>((_, ref) => {
  return (
    <div ref={ref} className="py-10 pb-0 px-60 flex flex-col">
      <h1 className="self-center font-rushink text-primary text-5xl mb-16">
        ABOUT US
      </h1>

      <p className="text-black text-lg">
        We specialize in organizing and facilitating travel experiences for
        individuals or groups visiting Cebu and Bohol. We offer a wide range of
        services such as arranging transportation, planning itineraries, and
        providing knowledgeable guides. We aim to make the travel experience
        convenient, enjoyable, and memorable for the clients, making sure that
        the infamous Filipino hospitality is warmly felt with a family business
        like ours.
      </p>
    </div>
  );
});

export { AboutUs };
