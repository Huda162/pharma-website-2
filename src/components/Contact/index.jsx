  import InputCom from "../Helpers/InputCom";
  import PageTitle from "../Helpers/PageTitle";
  import LayoutHomeTwo from "../Partials/LayoutHomeTwo";
  import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
  import { useTranslation } from "react-i18next";
  import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
  import { Link } from "react-router-dom";
  import useFetchData from "../../hooks/fetchData";

  export default function Contact() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyCbU4UQT_reh3zLwsTZDYLmRrpseZQUGfw" || "",
    });
    const { t } = useTranslation();
    const {data} = useFetchData('socials')

    const contactInfo = [
      {
        icon: <Phone className="w-6 h-6" />,
        title: t("Phone"),
        details: [data?.socials?.[2]?.url],
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        iconColor: "text-blue-600",
      },
      {
        icon: <Mail className="w-6 h-6" />,
        title: t("Email"),
        details: ["info@pharmaglows.com"],
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        iconColor: "text-green-600",
      },
      {
        icon: <MapPin className="w-6 h-6" />,
        title: t("Address"),
        details: [t("Palestine")],
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        iconColor: "text-purple-600",
      },
    ];

    return (
      <LayoutHomeTwo>
        <div className="contact-page-wrapper">
          <div className="">
            <PageTitle
              title={t("Contact Us")}
              subtitle={t("We're here to help. Get in touch with us.")}
              breadcrumb={[
                { name: t("Home Page"), path: "/" },
                { name: t("Contact Us"), path: "/contact" },
              ]}
            />
          </div>

          <div className="container mx-auto px-4 py-12">


            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className={`${item.bgColor} ${item.borderColor} border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300`}
                    >
                      <div className="flex items-start space-x-4 gap-2">
                        <div className={`${item.iconColor} flex-shrink-0 `}>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          {item.details.map((detail, idx) => (
                            <p
                              key={idx}
                              className="text-gray-700 text-sm leading-relaxed"
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-64 md:h-[450px] bg-gray-200">
                    {isLoaded && (
                      <GoogleMap
                        center={{ lat: 	31.53256800, lng: 35.09982700 }}
                        zoom={10}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        options={{
                          styles: [
                            {
                              featureType: "all",
                              elementType: "labels.text.fill",
                              stylers: [{ color: "#333333" }],
                            },
                          ],
                        }}
                      >
                        <MarkerF
                          position={{ lat: 	31.53256800, lng: 35.09982700 }}
                          icon={{
                            url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23306c6c'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z'/%3E%3C/svg%3E",
                            scaledSize: new window.google.maps.Size(40, 40),
                          }}
                        />
                      </GoogleMap>
                    )}
                  </div>
                  <div className="bg-white p-4">
                    <p className="text-sm text-gray-600 text-center">
                      {t("Our location in Palestine")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-6 gap-2">
                  <div className="w-12 h-12 bg-secondary-color rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-main-color" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {t("Send us a Message")}
                    </h2>
                    <p className="text-gray-600">
                      {t("We typically respond within 24 hours")}
                    </p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("Your Name")} *
                      </label>
                      <InputCom
                        name="name"
                        placeholder={t("Enter your name")}
                        required
                        inputClasses="w-full h-12 px-4 rounded-sm  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("Email Address")} *
                      </label>
                      <InputCom
                        name="email"
                        type="email"
                        placeholder="info@pharmaglows.com"
                        required
                        inputClasses="w-full h-12 px-4 rounded-sm  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("Subject")} *
                    </label>
                    <InputCom
                      name="subject"
                      placeholder={t("What is this regarding?")}
                      required
                      inputClasses="w-full h-12 px-4 rounded-sm  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("Message")} *
                    </label>
                    <textarea
                      name="message"
                      rows="6"
                      placeholder={t("Type your message here...")}
                      className="w-full px-4 py-3 rounded-md border border-gray-300  transition resize-none"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-main-color to-main-color/70 text-white font-semibold rounded-lg hover:from-main-color/70 hover:to-main-color transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>{t("Send Message")}</span>
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      {t("By submitting this form, you agree to our")}{" "}
                      <Link to="/privacy-policy" className="text-main-color hover:underline">
                        {t("Privacy Policy")}
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Additional Information Section */}
            {/* <div className="mt-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {t("Online Store Support")}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {t(
                    "We are an online store available 24/7 for your shopping needs. For inquiries and support, please contact us during regular hours."
                  )}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </LayoutHomeTwo>
    );
  }
