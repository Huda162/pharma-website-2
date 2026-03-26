import BreadcrumbCom from "../BreadcrumbCom";

export default function PageTitle({ title, breadcrumb = [], solid = false }) {
  return (
    <div
      className={`page-title-wrapper relative w-full -mt-4  ${
        solid ? "h-[100px] py-2" : "h-[150px] py-4 bg-gradient-to-b from-main-color/10 to-primarygray"
      }  overflow-hidden`}
    >
      {solid ? (
        <div className="container-x mx-auto relative z-10 ">
          <div className="mb-4">
            <BreadcrumbCom paths={breadcrumb} />
          </div>
          <div className="flex justify-start items-center">
            <h1 className="text-3xl font-semibold text-qgray mb-2 tracking-wide">
              {title}
            </h1>
          </div>
        </div>
      ) : (
        <div className="container-x mx-auto relative z-10">
          <div className="mb-4">
            <BreadcrumbCom paths={breadcrumb} />
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-4xl font-semibold text-qblack mb-2 tracking-wide">
              {title}
            </h1>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-[50px] bg-white/30 blur-lg"></div>
    </div>
  );
}
