import CategoryCard from "./Cards/CategoryCard";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";
import ProductCardStyleThree from "./Cards/ProductCardStyleThree";
import { PropTypes } from "prop-types";
import { useState } from "react";
import Ads from "../Home/Ads";
export default function SectionStyleOne({
  className,
  // categoryTitle,
  sectionTitle,
  seeMoreUrl,
  brands = [],
  products = [],
  categoryBackground,
}) {
  SectionStyleOne.propTypes = {
    products: PropTypes.instanceOf(Array).isRequired,
  };

  return (
    <div   className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:gap-[30px] gap-5">
            <DataIteration
              datas={products}
              startLength={0}
              endLength={products.length}
            >
              {({ datas }) => (
                <div key={datas.id} className="item">
                  <ProductCardStyleThree
                    datas={datas}
                    // openDialog={openDialog}
                  />
                </div>
              )}
            </DataIteration>
            {/* <div className="category-card hidden xl:block w-full">
              <CategoryCard
                background={categoryBackground}
                // title={categoryTitle}
                // brands={filterBrands}
              />
            </div> */}
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
