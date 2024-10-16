/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react";

interface IVideoSelectProps {
  videoUrls: string[];
}

const VideoSelect = ({ videoUrls }: IVideoSelectProps) => {
  const [mainVideoUrl, setMainVideoUrl] = useState(videoUrls[0]);

  useEffect(() => {
    setMainVideoUrl(videoUrls[0]);
  }, [videoUrls]);

  return (
    <div className="lg:px-8">
      {/* main video */}
      <div className="w-full h-80 overflow-hidden rounded-md mb-5 md:mb-10">
        <iframe
          title="main product video"
          className="w-full h-full"
          src={mainVideoUrl}
        />
      </div>

      {/* video options */}
      <div className="flex items-center gap-4 md:gap-10">
        {videoUrls
          .filter((url) => url !== mainVideoUrl)
          .map((link, index) => (
            <div
              key={index}
              tabIndex={0}
              role="button"
              onClick={() => setMainVideoUrl(link)}
              className="wrap h-30 md:h-24 w-full basis-1/4 overflow-hidden rounded-md"
            >
              <iframe
                title={`product video ${index}`}
                className="w-full h-full"
                src={link}
              />
              {/* used to make the video option not playable */}
              <div className="h-full w-full" />
            </div>
          ))}
      </div>
    </div>
  );
};

export { VideoSelect };
