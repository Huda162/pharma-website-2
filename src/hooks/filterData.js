import axios from "axios";
import { useEffect, useState } from "react";

export default function useFilterData(url) {
  const [maxVal, setMax] = useState(1000);
  const [minVal, setMin] = useState(15);
  const [selectedValue, setValue] = useState([minVal, maxVal]);
  const [sortKey, setSortKey] = useState("");
  const [products, setData] = useState([]);
  const [loadProducts, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://pharmaglows.com/admin/api/${url}`);
      if (!url.includes("max_price", 0) && !url.includes("min_price", 0)) {
        setMax(response?.data?.filters?.price_range?.max);
        setMin(response?.data?.filters?.price_range?.min);
        setValue([
          response?.data?.filters?.price_range?.min,
          response?.data?.filters?.price_range?.max,
        ]);
      }
      setData(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const maxPrice = products.reduce((prev, current) =>
        prev.price_nis_retail > current.price_nis_retail ? prev : current
      );
      const minPrice = products.reduce((prev, current) =>
        prev.price_nis_retail < current.price_nis_retail ? prev : current
      );
      setMax(maxPrice.price_nis_retail);
      setMin(minPrice.price_nis_retail);
      setValue([minPrice.price_nis_retail, maxPrice.price_nis_retail]);
    }
    console.log(maxVal, minVal, selectedValue);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [url]);

  return {
    products,
    loadProducts,
    maxVal,
    setMax,
    minVal,
    setMin,
    selectedValue,
    setValue,
    sortKey,
    setSortKey,
  };
}
