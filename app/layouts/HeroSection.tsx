/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { Hero, IHeroProps, TNavBarItems } from "~/components";

interface IHeroSection {
  heroDetails: IHeroProps;
  onScrolledCallback?: (section: TNavBarItems) => void;
}

const HeroSection = forwardRef<HTMLDivElement, IHeroSection>((props, ref) => {
  return (
    <div ref={ref}>
      <Hero {...props.heroDetails} />
    </div>
  );
});

export { HeroSection };
