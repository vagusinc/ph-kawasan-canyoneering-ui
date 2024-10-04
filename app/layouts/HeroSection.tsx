/* eslint-disable react/display-name */
import { forwardRef } from "react";

import { Hero, IHeroProps, TNavBarItems } from "~/components";
import { TFileType } from "~/types/StrapiTypes";

interface IHeroSection {
  heroDetails: IHeroProps;
  videoHeadline?: TFileType;
  onScrolledCallback?: (section: TNavBarItems) => void;
}

const HeroSection = forwardRef<HTMLDivElement, IHeroSection>((props, ref) => {
  return (
    <div ref={ref}>
      <Hero
        {...props.heroDetails}
        videoBackgroundUrl={props.videoHeadline?.url}
      />
    </div>
  );
});

export { HeroSection };
