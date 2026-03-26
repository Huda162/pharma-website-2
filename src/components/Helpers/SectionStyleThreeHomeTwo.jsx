import ProductCardStyleOneTwo from "./Cards/ProductCardStyleOneTwo";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleThreeHomeTwo({
  className,
  sectionTitle,
  seeMoreUrl,
  products = [],
  showProducts,
}) {
  return (
    <div className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid  lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-10">
            <DataIteration
              datas={products}
              startLength={0}
              endLength={showProducts}
            >
              {({ datas }) => (
                <div   key={datas.id} className="item">
                  <ProductCardStyleOneTwo datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
