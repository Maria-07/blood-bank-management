import React from "react";
import { TbPointFilled } from "react-icons/tb";

const AboutPage = () => {
  return (
    <div>
      <div>
        <div className="md:w-[70%] w-[90%] sm:mx-auto py-10">
          <div className="md:w-[100%] sm:mx-auto sm:px-0 px-2  gap-3 items-center justify-between">
            <div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sm:pl-10 mx-auto"
            >
              <h1 className="font-bold text-center lg:text-5xl text-3xl font-primary">
                About Us
              </h1>
              <hr className="p-[2px] bg-primary w-[15%] mx-auto" />
              <p className="text-base text-accent text-center mt-3 ">
                &quot;The best gift of humanity is blood – save lives by
                donating blood.&quot;
              </p>
            </div>
          </div>
          {/* <div className="py-5 bg-[#F2F2F2] rounded-xl shadow-md   px-5 "></div> */}

          <div className="px-2 sm:px-10 my-5">
            <div className="my-10 text-base  text-center">
              <span className="text-xl font-semibold text-secondary">
                Hemoglobin
              </span>
              {" "}is a digital blood donation platform initiated for the people of
              Nilphamari District, aiming to ensure fast, easy, and effective
              access to blood services. This initiative has been established and
              is operated under the personal vision, direct guidance, and strong
              efforts of the Honorable Deputy Commissioner of Nilphamari,
              <strong>Mr. Mohammad Nairuzzaman.</strong> Under his leadership, a
              dedicated team within the District Administration is consistently
              working to ensure the success of this mission. The Civil Surgeon’s
              Office, Nilphamari is providing technical support for blood group
              testing and volunteer training, while members of the Bangladesh
              Scouts, Nilphamari District are serving selflessly as volunteers
              to push this humanitarian effort forward.
            </div>
            <div className="border-[1px] sm:px-5 px-1 my-20 rounded-sm shadow-md pt-5 pb-16">
              <h1 className="text-xl font-semibold uppercase my-10 text-center">
               Why This Platform Was Needed?
              </h1>
              <div className="flex gap-2 mx-7 my-5 pl-5 border-primary border-l-[5px]">
                Blood donation is a noble act — not only does it help save
                lives, but donating blood regularly can also contribute
                positively to the health of the donor. However, matching donors
                and recipients at the right time remains a major challenge.
                Additionally, many people in our society are unaware of their
                blood group, which causes complications in emergencies.
              </div>

              <div className="flex gap-2 mx-7 my-5 pl-5 border-primary border-l-[5px]">
                To overcome these barriers, this platform was created as an
                innovative initiative by the Deputy Commissioner of Nilphamari.
                It bridges the gap between donors and recipients and raises
                awareness about blood donation.
              </div>
            </div>
            <div className=" sm:p-5 p-1 my-20 ">
              <h1 className="text-xl font-semibold text-center my-5 uppercase ">
                 Our Stakeholders
              </h1>

              <div className="ml-7 my-4">
                {/* <h2 className="text-lg font-semibold text-secondary">
                  This initiative involves three key groups:
                </h2> */}
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <div>
                  <div className="ml-7 my-4 p-5 rounded-md border h-[340px] bg-primary text-white">
                    <h2 className="text-lg font-semibold">
                      District Administration – Led by the Deputy Commissioner
                      and supported by the Civil Surgeon’s Office, this team
                      handles:
                    </h2>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-sm" /> Platform development
                      and maintenance
                    </div>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-sm" /> Volunteer training
                    </div>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-sm" /> Campaign planning
                      and execution
                    </div>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-sm" /> Donor engagement and
                      support
                    </div>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-base" /> Recognizing top
                      donors and issuing digital ID cards
                    </div>
                  </div>
                </div>
                <div>
                  <div className="ml-7 my-4 p-5 h-[160px] rounded-md border ">
                    <h2 className="text-lg font-semibold">
                      Bangladesh Scouts – Nilphamari – Act as volunteers in:
                    </h2>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-sm" /> Blood group
                      identification at campaign
                    </div>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-sm" /> Uploading data into
                      the central database
                    </div>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-sm" /> Conducting awareness
                      campaigns
                    </div>
                  </div>  <div className="ml-7 my-4 p-5 rounded-md border h-[160px] bg-sky-600
                   text-white">
                    <h2 className="text-lg font-semibold">
                      Platform Users – General public who:
                    </h2>
                    <div className="flex items-center gap-2  mt-2">
                      <TbPointFilled className="text-sm" /> Register as donors
                    </div>
                    <div className="flex items-center gap-2   mt-2">
                      <TbPointFilled className="text-sm" /> Search for and
                      contact blood donors during emergencies
                    </div>
                  </div>
                </div>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
