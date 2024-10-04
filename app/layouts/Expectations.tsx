import { Fragment } from "react/jsx-runtime";
import { TItemType } from "~/types/StrapiTypes";
import { TTour } from "~/types/TourTypes";

interface IExpectationsProps {
  tours: TItemType<TTour>[];
}

const Expectations = (props: IExpectationsProps) => {
  return (
    <div className="py-10 px-40 mb-52 flex flex-col h-screen">
      <h1 className="self-center font-rushink text-primary text-5xl mb-12">
        WHAT TO EXPECT
      </h1>

      <div className="flex flex-col gap-6 h-screen">
        {props.tours.slice(0, 2).map((tour, index) => (
          <Fragment key={index}>
            <div
              className={`flex ${
                index != 0 ? "flex-row-reverse" : ""
              } gap-4 h-1/2`}
            >
              {/* main image */}
              <div className="wrap w-1/2 h-full rounded-xl overflow-hidden">
                <img
                  src={tour.attributes?.tour_images.data.at(0)?.attributes.url}
                  alt="main"
                  className="w-full min-h-full object-cover"
                />
                <div className="h-full bg-black opacity-30" />
                <h3 className="self-end font-bold text-xl text-white z-10 mx-6 my-4">
                  {tour.attributes.name}
                </h3>
              </div>
              <div className="flex flex-col gap-4 w-1/2 overflow-hidden">
                {/* first and second image */}
                <div className="flex items-center gap-4 h-1/2">
                  <div className="w-1/2 h-full rounded-xl overflow-hidden">
                    <img
                      src={
                        tour.attributes?.tour_images.data.at(1)?.attributes.url
                      }
                      alt="main"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 h-full rounded-xl overflow-hidden">
                    <img
                      src={
                        tour.attributes?.tour_images.data.at(2)?.attributes.url
                      }
                      alt="main"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* third and fourth image */}
                <div className="flex items-center gap-4 h-1/2">
                  <div className="w-1/2 h-full rounded-xl overflow-hidden">
                    <img
                      src={
                        tour.attributes?.tour_images.data.at(3)?.attributes.url
                      }
                      alt="main"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-1/2 h-full rounded-xl overflow-hidden">
                    <img
                      src={
                        tour.attributes?.tour_images.data.at(4)?.attributes.url
                      }
                      alt="main"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export { Expectations };
