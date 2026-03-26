import { useTranslation } from "react-i18next";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <LayoutHomeTwo>
      <div className="terms-condition-page w-full pb-[30px]">
        <div className="w-full mb-[30px]">
          <PageTitle
            breadcrumb={[
              { name: t("Home Page"), path: "/" },
              { name: t("privacy policy"), path: "" },
            ]}
            title={t("privacy policy")}
          />
        </div>
        <div className="container-x mx-auto">
          <div className="mx-[2rem]  whitespace-pre-line">{t("privacy policy page content")}</div>

        </div>
      </div>
    </LayoutHomeTwo>
  );
}
