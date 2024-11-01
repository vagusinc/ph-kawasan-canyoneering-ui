interface IBannerProps {
  bannerText: string;
}

const Banner = ({ bannerText }: IBannerProps) => {
  return <div className="bg-primary-400 text-center py-2">{bannerText}</div>;
};

export { Banner };
