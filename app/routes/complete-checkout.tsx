import { json, Link, useLoaderData, useNavigate } from "@remix-run/react";

import { getTours } from "~/.server/api/tours";
import { NavBar, TNavBarItems } from "~/components";
import { Footer } from "~/layouts";

export const loader = async () => {
  const [tours] = await Promise.all([getTours()]);

  return json({
    tours: tours?.data || [],
  });
};

export default function CompleteCheckout() {
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
      <div className="flex flex-col h-auto px-48 py-40 pt-56 items-center justify-center gap-2">
        <h1 className="font-rushink text-7xl text-primary mb-10">
          THANK YOU FOR BOOKING WITH US
        </h1>
        <p>
          If you need to make any changes or have any special request, feel free
          to reach us through +6391772221704. We’re here to help!
        </p>
        <p>Looking forward to seeing you soon!</p>

        <Link to={"/"} className="text-primary underline">
          Back to homepage
        </Link>
      </div>
      <Footer
        tours={tours}
        onAboutUsClicked={() => handleNavClick("about us")}
        onFAQClicked={() => handleNavClick("faq")}
      />
    </div>
  );
}
