import React from "react";
import Loading from "../../Loader/Loading";
import Error from "../../Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import Tabs from "./Tabs";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../Pages/Doctor/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

export default function Dashboard() {
  const [tab, setTab] = React.useState("overview");
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* valid info-circle icon path */}
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-10.5a.75.75 0 10-1.5 0v1.5a.75.75 0 101.5 0V7.5zM9.25 10a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4z" />
                  </svg>

                  <span className="sr-only">Info</span>
                  <div>
                    To get your profile approved, please complete all required fields and submit your documents.
                  </div>
                </div>
              )}

              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img src={data?.photo} alt="" className="w-full" />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data.specialization}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[16px] text-[14px] leading-5
                          lg:leading-6 lg:text-[16px] text-headingColor font-semibold">
                            <img src={starIcon} alt="" />
                           {data.averageRating}
                          </span>
                          <span className=" text-[14px] leading-5
                          lg:leading-6 lg:text-[16px] text-textColor font-semibold">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className="text_para font-[15px] lg:max-w-[390px] leading-6">{data.bio}</p>
                      </div>
                    </div>
                    <DoctorAbout name={data.name} about={data.about} qualification={data.qualification} experience={data.experiences || data.experience} />
                  </div>
                )}

                {tab === "appointments" && <Appointments appointments={data.appointments} />}
                {tab === "settings" && <Profile doctorData={data} />}
              </div>


            </div>
          </div>
        )}
      </div>
    </section>

  );
};


