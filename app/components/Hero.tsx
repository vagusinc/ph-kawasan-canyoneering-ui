import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/base-components/ui/carousel";
import { Button } from "./Button";

export interface IHeroProps {
  title: string;
  subTitle: string;
  ctaText: string;
  backgroundImages: string[];
  videoBackgroundUrl?: string;
  ctaHandler?: () => void;
}

const CAROUSEL_AUTOPLAY_DELAY = 5000;

const Hero = ({
  title,
  subTitle,
  ctaText,
  backgroundImages,
  videoBackgroundUrl,
  ctaHandler,
}: IHeroProps) => {
  return (
    <div className="wrap">
      <div>
        {videoBackgroundUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-[50dvh] lg:h-full object-cover pointer-events-none"
          >
            <source src={videoBackgroundUrl} type="video/mp4" />
            <track default kind="captions" srcLang="en" src="" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Carousel
            className="w-screen"
            plugins={[
              Autoplay({
                delay: CAROUSEL_AUTOPLAY_DELAY,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent noGap>
              {backgroundImages.map((image, index) => (
                <CarouselItem key={index} noGap>
                  <img
                    src={image}
                    alt="hero banner"
                    className="h-[50dvh] md:h-screen w-screen object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious insideCarousel className="z-20" />
            <CarouselNext insideCarousel className="z-20" />
          </Carousel>
        )}
      </div>
      <div className="h-full bg-black opacity-60" />
      <div className="h-full z-10 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <h1 className="font-rushink text-3xl md:text-5xl lg:text-7xl">
            {title}
          </h1>
          <p className="px-10 md:px-0 text-center text-[9px] md:text-base mb-4 md:mb-10">
            {subTitle}
          </p>
          <Button onClick={() => ctaHandler?.()}>{ctaText}</Button>
        </div>
      </div>
    </div>
  );
};

export { Hero };
