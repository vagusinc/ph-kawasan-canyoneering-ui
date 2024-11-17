/* eslint-disable no-case-declarations */
/* eslint-disable import/no-unresolved */
import type { MetaFunction } from "@remix-run/node";

import { Footer } from "~/layouts";

export const meta: MetaFunction = () => {
  return [
    { title: "PH Kawasan Canyoneering" },
    { name: "description", content: "Welcome to PH Kawasan Canyoneering!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* <NavBar tours={[]} activeLink={"home"} elevateBackground={true} /> */}
      <div className="flex flex-col h-auto px-8 md:px-12 lg:px-48 py-40 md:pt-56 items-center justify-center gap-2">
        <h1 className="font-rushink text-center text-3xl md:text-5xl lg:text-7xl text-primary mb-10">
          The site is under maintenance.
        </h1>
        <p className="text-center">
          Please reach out to +6391772221704 for any inquiries.
        </p>
      </div>
      <Footer tours={[]} />
    </div>
  );
}
