/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from "react";

interface IPhotoSelectProps {
  imageUrls: string[];
}

const PhotoSelect = ({ imageUrls }: IPhotoSelectProps) => {
  const [mainImageUrl, setMainImageUrl] = useState(imageUrls[0]);

  useEffect(() => {
    setMainImageUrl(imageUrls[0]);
  }, [imageUrls]);

  return (
    <div className="px-8">
      {/* main video */}
      <div className="w-full h-80 overflow-hidden rounded-md mb-10">
        <img
          src={mainImageUrl}
          alt="tour pic"
          className="w-full h-full object-cover"
        />
      </div>

      {/* video options */}
      <div className="flex items-center gap-10">
        {imageUrls
          .filter((url) => url !== mainImageUrl)
          .map((link, index) => (
            <div
              key={index}
              tabIndex={0}
              role="button"
              onClick={() => setMainImageUrl(link)}
              className="wrap h-24 w-full basis-1/4 overflow-hidden rounded-md"
            >
              <img
                src={link}
                className="w-full h-full object-cover"
                alt="tour pic"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export { PhotoSelect };
