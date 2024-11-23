/* eslint-disable no-case-declarations */
/* eslint-disable import/no-unresolved */
import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData, useLocation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import { getBanner } from "~/.server/api/banner";
import { getFAQs } from "~/.server/api/faqs";
import { getReviews } from "~/.server/api/reviews";
import { getTours } from "~/.server/api/tours";
import { NavBar, TNavBarItems, WhatsAppFloatingButton } from "~/components";
import { useScrollOffset } from "~/hooks/useScrollOffset";
import {
  AboutUs,
  Expectations,
  FAQ,
  FeaturedServices,
  Footer,
  HeroSection,
  Reviews,
} from "~/layouts";

export const meta: MetaFunction = () => {
  return [
    { title: "PH Kawasan Canyoneering" },
    { name: "description", content: "Welcome to PH Kawasan Canyoneering!" },
  ];
};

export const loader = async () => {
  const [tours, reviews, faqs, banner] = await Promise.all([
    getTours(),
    getReviews(),
    getFAQs(),
    getBanner(),
  ]);

  return json({
    tours: tours?.data || [],
    reviews: reviews?.data || [],
    faqs: faqs?.data || [],
    banner,
  });
};

export default function Index() {
  const { tours, reviews, faqs, banner } = useLoaderData<typeof loader>();

  const [activeLink, setActiveLink] = useState<TNavBarItems>("home");
  const { state } = useLocation();

  const scrollOffset = useScrollOffset();

  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const servicesSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutUsSectionRef = useRef<HTMLDivElement | null>(null);
  const faqSectionRef = useRef<HTMLDivElement | null>(null);

  const heroDetails = {
    title: "PH KAWASAN CANYONEERING",
    subTitle:
      "Experience great heights of excitement and thrilling adventure in Kawasan, Cebu.",
    ctaText: "BOOK AN APPOINTMENT",
    ctaHandler: () => handleNavClick("services"),
  };

  const handleNavClick = (section: TNavBarItems) => {
    const yOffset = -100;
    let scrollToY = 0;

    switch (section) {
      case "home":
        if (!heroSectionRef.current) return;

        scrollToY =
          heroSectionRef.current?.getBoundingClientRect()?.top + window.scrollY;
        break;
      case "services":
        if (!servicesSectionRef.current) return;

        scrollToY =
          servicesSectionRef.current?.getBoundingClientRect()?.top +
          window.scrollY +
          yOffset;
        break;
      case "about us":
        if (!aboutUsSectionRef.current) return;

        scrollToY =
          aboutUsSectionRef.current?.getBoundingClientRect()?.top +
          window.scrollY +
          yOffset;
        break;
      case "faq":
        if (!faqSectionRef.current) return;

        scrollToY =
          faqSectionRef.current?.getBoundingClientRect()?.top +
          window.scrollY +
          yOffset;
        break;
    }

    window.scrollTo({ top: scrollToY, behavior: "smooth" });
  };

  const handleOnScrolledCallback = (scrollOffset: number) => {
    if (
      !!servicesSectionRef.current &&
      scrollOffset <
        servicesSectionRef.current?.getBoundingClientRect()?.top +
          window.screenY
    ) {
      setActiveLink("home");
      return;
    }

    if (
      !!heroSectionRef.current &&
      scrollOffset >
        heroSectionRef.current?.getBoundingClientRect()?.top + window.screenY &&
      !!aboutUsSectionRef.current &&
      scrollOffset <
        aboutUsSectionRef.current?.getBoundingClientRect()?.top + window.screenY
    ) {
      setActiveLink("services");
      return;
    }

    if (
      !!servicesSectionRef.current &&
      scrollOffset >
        servicesSectionRef.current?.getBoundingClientRect()?.top +
          window.screenY &&
      !!faqSectionRef.current &&
      scrollOffset <
        faqSectionRef.current?.getBoundingClientRect()?.top +
          window.screenY +
          2500
    ) {
      setActiveLink("about us");
      return;
    }

    if (
      !!aboutUsSectionRef.current &&
      scrollOffset >
        aboutUsSectionRef.current?.getBoundingClientRect()?.top + window.screenY
    ) {
      setActiveLink("faq");
      return;
    }
  };

  useEffect(() => {
    handleOnScrolledCallback(scrollOffset);
  }, [scrollOffset]);

  useEffect(() => {
    if (!state?.section) return;

    handleNavClick(state?.section);
  }, [state]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar
        tours={tours}
        activeLink={activeLink}
        banner={banner}
        onItemClick={handleNavClick}
      />
      <HeroSection heroDetails={heroDetails} ref={heroSectionRef} />
      <FeaturedServices ref={servicesSectionRef} products={tours} />
      <Expectations tours={tours.length > 0 ? tours.slice(0, 2) : []} />
      <AboutUs ref={aboutUsSectionRef} />
      <Reviews reviews={reviews} />
      <FAQ ref={faqSectionRef} questions={faqs} />
      <Footer
        tours={tours}
        onAboutUsClicked={() => handleNavClick("about us")}
        onFAQClicked={() => handleNavClick("faq")}
      />
      <WhatsAppFloatingButton />
    </div>
  );
}
