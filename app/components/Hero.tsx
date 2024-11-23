import video from "~/assets/videos/video-headline.mp4";
import { Button } from "./Button";

export interface IHeroProps {
  title: string;
  subTitle: string;
  ctaText: string;
  ctaHandler?: () => void;
}

const Hero = ({ title, subTitle, ctaText, ctaHandler }: IHeroProps) => {
  return (
    <div className="wrap">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-[50dvh] lg:h-full object-cover pointer-events-none"
      >
        <source src={video} type="video/mp4" />
        <track default kind="captions" srcLang="en" src="" />
        Your browser does not support the video tag.
      </video>
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
