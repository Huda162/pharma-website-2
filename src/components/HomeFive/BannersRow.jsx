import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannersRow({ banners = [] }) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getImageUrl = (banner) => {
    const lang = currentLanguage.split('-')[0];
    
    if (isMobile) {
      if (lang === 'en' && banner.image_mobile_en) {
        return banner.image_mobile_en;
      }
      return banner.image_mobile || banner.image;
    } else {
      if (lang === 'en' && banner.image_en) {
        return banner.image_en;
      }
      return banner.image;
    }
  };

  const getTitle = (banner) => {
    const lang = currentLanguage.split('-')[0];
    switch (lang) {
      case 'ar':
        return banner.title_ar;
      case 'he':
        return banner.title_he;
      case 'en':
      default:
        return banner.title_en !== 'empty' ? banner.title_en : banner.title_ar;
    }
  };

  const getLink = (banner) => {
    if (banner.type === 'product' && banner.related_data) {
      return `/single-product/${banner.related_data.id}`;
    } else if (banner.type === 'link'){
      return banner.post_url
    }
    return "#";
  };

  if (!banners.length) return null;

  // React Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 2 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="container-x mx-auto w-full pb-6 px-4 overflow-hidden ">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={banner.id} className="px-2">
            <Link 
              to={getLink(banner)} 
              className="block w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-xl"
            >
              {/* Container with 4:5 aspect ratio */}
              <div className="w-full relative overflow-hidden rounded-lg aspect-[4/5]">
                <img
                  src={getImageUrl(banner)}
                  alt={getTitle(banner) || `Banner ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  onError={(e) => {
                    e.target.src = banner.image;
                  }}
                />
              </div>
            </Link>
          </div>
        ))}
      </Slider>

      {/* Custom CSS to style react-slick dots to match your design */}
      <style jsx>{`
        :global(.slick-dots) {
          bottom: -30px;
        }
        :global(.slick-dots li button:before) {
          font-size: 8px;
          color: #d1d5db;
          opacity: 1;
        }
        :global(.slick-dots li.slick-active button:before) {
          color: #d97706;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}