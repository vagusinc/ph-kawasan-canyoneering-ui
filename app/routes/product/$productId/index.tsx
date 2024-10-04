import { json, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { useMemo } from "react";

import { getReviews } from "~/.server/api/reviews";
import { getTours } from "~/.server/api/tours";
import { NavBar, TNavBarItems } from "~/components";
import { Footer, ProductForm, Reviews, SimilarProducts } from "~/layouts";

export const loader = async () => {
  const [tours, reviews] = await Promise.all([getTours(), getReviews()]);

  return json({
    tours: tours?.data || [],
    reviews: reviews?.data || [],
  });
};

export default function Index() {
  const { tours, reviews } = useLoaderData<typeof loader>();

  const { productId } = useParams();
  const navigate = useNavigate();

  const tour = useMemo(() => {
    if (!productId || tours.length === 0) return undefined;

    return tours.find((tour) => tour.id === parseInt(productId));
  }, [tours, productId]);

  const similarProducts = useMemo(() => {
    if (tours.length === 0 || !productId) return [];

    return tours.filter((tour) => tour.id != parseInt(productId));
  }, [tours, productId]);

  const reviewsAverage = useMemo(() => {
    if (reviews.length === 0) return 0;

    return (
      reviews.reduce((average, pr) => (average += pr.attributes.stars), 0) /
      reviews.length
    );
  }, reviews);

  const handleNavClick = (section: TNavBarItems) => {
    if (section === "services") return;
    navigate("/", { state: { section } });
  };

  return (
    <div className="flex flex-col w-full">
      <NavBar
        tours={tours}
        elevateBackground
        activeLink="services"
        onItemClick={handleNavClick}
      />
      {!!tour && <ProductForm product={tour} />}
      <Reviews average={reviewsAverage} reviews={reviews} />
      <div className="mb-12">
        <SimilarProducts products={similarProducts} />
      </div>
      <Footer
        tours={tours}
        onAboutUsClicked={() =>
          navigate("/", { state: { section: "about us" } })
        }
        onFAQClicked={() => navigate("/", { state: { section: "faq" } })}
      />
    </div>
  );
}
