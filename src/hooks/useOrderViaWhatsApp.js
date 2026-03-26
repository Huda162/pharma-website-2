import { useTranslation } from "react-i18next";

export default function useAddViaWhatsapp(product) {
  const { i18n } = useTranslation();
  const handleAddViaWhatsapp = () => {
    const message =
      i18n.language == "ar"
        ? "مرحبا أنا مهتم بالمنتج التالي من موقع سيما، هل يمكنك تزويدي بمزيد من التفاصيل أو مساعدتي في طلبي\n" +
          `${product?.price_nis_retail} :السعر،${product.name_ar} :المنتج \n` +
          `تحقق من ذلك : https://sema.ps/single-product/${product?.id} \n`
        : "Hello! I am interested in the following product from Yolo website, Could you please provide me with more details or assist me with my order?\n" +
          `Product name:  ${product?.name_en}, price : ${product.price_nis_retail}\n` +
          `Check it out: https://sema.ps/single-product/${product?.id} \n`;

    const encodedMessage = encodeURIComponent(message);

    const url = `https://api.whatsapp.com/send?phone=972569612115&text=${encodedMessage}`;

    window.open(url);
  };

  return handleAddViaWhatsapp;
}
