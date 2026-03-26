import { useState } from "react";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";
import ProductCardStyleThree from "./Cards/ProductCardStyleThree";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { addFavorite } from "../../redux/favoriteSlice";

export default function SectionStyleOneHmFour({
  className,
  sectionTitle,
  seeMoreUrl,
  products,
}) {
  SectionStyleOneHmFour.propTypes = {
    products: PropTypes.instanceOf(Array).isRequired,
  };
  const dispatch = useDispatch();
  console.log(products, "product");
  const handleAddcart = (pro) => {
    dispatch(addItem({ newItem: pro }));
  };
  const handleAddFavorite = (item) => {
    dispatch(addFavorite({ newItem: item }));
    console.log(item);
  };
  return (
    <div   className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            <DataIteration
              datas={products}
              startLength={0}
              endLength={products?.length}
            >
              {({ datas }) => (
                <div key={datas.id} className="item">
                  <ProductCardStyleThree
                    datas={datas}
                    onAddCart={() => handleAddcart(datas)}
                    onAddFavorite={() => handleAddFavorite(datas)}
                  />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
