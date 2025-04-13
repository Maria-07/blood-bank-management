import React from "react";
import { TbPointFilled } from "react-icons/tb";

const AboutPage = () => {
  return (
    <div>
      <div>
        <div className="md:w-[90%] sm:mx-auto py-10">
          <div className="md:w-[100%] sm:mx-auto sm:px-0 px-2  gap-3 items-center justify-between">
            <div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sm:pl-10"
            >
              <h1 className="font-bold lg:text-5xl text-3xl font-primary">
                About Us
              </h1>
              <hr className="p-[2px] bg-primary w-[10%]" />
              <p className="text-base text-accent  mt-3">
                &quot;The best gift of humanity is blood – save lives by
                donating blood.&quot;
              </p>
            </div>
          </div>
          {/* <div className="py-5 bg-[#F2F2F2] rounded-xl shadow-md   px-5 "></div> */}

          <div className="px-2 sm:px-10 my-5 text-justify">
            {" "}
            <p className="mb-10 text-sm">
              <span className="text-xl font-semibold text-secondary">
                Hemoglobin
              </span>{" "}
              is a digital blood donation platform initiated for the people of
              Nilphamari District, aiming to ensure fast, easy, and effective
              access to blood services. This initiative has been established and
              is operated under the personal vision, direct guidance, and strong
              efforts of the Honorable Deputy Commissioner of Nilphamari,{" "}
              <strong>Mr. Mohammad Nayiruzzaman.</strong> <br /> <br /> Under
              his leadership, a dedicated team within the District
              Administration is consistently working to ensure the success of
              this mission. The Civil Surgeon’s Office, Nilphamari is providing
              technical support for blood group testing and volunteer training,
              while members of the Bangladesh Scouts, Nilphamari District are
              serving selflessly as volunteers to push this humanitarian effort
              forward.
            </p>
            <p className="border-[1px] sm:p-5 p-1 my-5 rounded-sm shadow-md">
              <h1 className="text-xl font-semibold">
                🩸 Why This Platform Was Needed
              </h1>
              <div className="flex gap-2 ml-7 mt-2">
                {" "}
                <TbPointFilled className="text-2xl" /> Blood donation is a noble
                act — not only does it help save lives, but donating blood
                regularly can also contribute positively to the health of the
                donor. However, matching donors and recipients at the right time
                remains a major challenge. Additionally, many people in our
                society are unaware of their blood group, which causes
                complications in emergencies.
              </div>

              <div className="flex gap-2 ml-7 mt-2">
                {" "}
                <TbPointFilled /> To overcome these barriers, this platform was
                created as an innovative initiative by the Deputy Commissioner
                of Nilphamari. It bridges the gap between donors and recipients
                and raises awareness about blood donation.
              </div>
            </p>
            <p className="border-[1px] sm:p-5 p-1 my-5 rounded-sm shadow-md">
              <h1 className="text-xl font-semibold">👥 Our Stakeholders</h1>

              <div className="ml-7 my-4">
                {" "}
                <h2 className="text-lg font-semibold">
                  This initiative involves three key groups:
                </h2>
              </div>
              <div className="ml-7 my-4">
                {" "}
                <h2 className="text-sm font-semibold">
                  1. District Administration – Led by the Deputy Commissioner
                  and supported by the Civil Surgeon’s Office, this team
                  handles:
                </h2>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Platform development and
                  maintenance
                </div>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Volunteer training
                </div>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Campaign planning and
                  execution
                </div>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Donor engagement and
                  support
                </div>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Recognizing top donors
                  and issuing digital ID cards
                </div>
              </div>
              <div className="ml-7 my-4">
                {" "}
                <h2 className="text-sm font-semibold">
                  2. Bangladesh Scouts – Nilphamari – Act as volunteers in:
                </h2>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Blood group
                  identification at camps
                </div>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Uploading data into the
                  central database
                </div>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Conducting awareness
                  campaigns
                </div>
              </div>
              <div className="ml-7 my-4">
                {" "}
                <h2 className="text-sm font-semibold">
                  3. Platform Users – General public who:
                </h2>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Register as donors
                </div>
                <div className="flex items-center gap-2 ml-3  mt-2">
                  {" "}
                  <TbPointFilled className="text-sm" /> Search for and contact
                  blood donors during emergencies
                </div>
              </div>
            </p>{" "}
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              {" "}
              <p className="border-[1px] sm:p-5 p-1 my-5 rounded-sm shadow-md">
                <h1 className="text-xl font-semibold">🎭 Vision</h1>
                <div className="flex gap-2 ml-7 mt-2">
                  To simplify and accelerate the availability of blood in
                  Nilphamari by building a digital system that stores donor
                  information and helps locate suitable donors swiftly.
                </div>
              </p>
              <p className="border-[1px] sm:p-5 p-1 my-5 rounded-sm shadow-md">
                <h1 className="text-xl font-semibold">🚀 Mission</h1>
                <div className="flex gap-2 ml-7 mt-2">
                  To establish an organized, technology-driven blood donation
                  network that helps identify everyone&apos;s blood group and
                  connect potential donors through a reliable platform.
                </div>
              </p>{" "}
            </div>
            <p className="border-[1px] sm:p-5 p-1 my-5 rounded-sm shadow-md">
              <h1 className="text-xl font-semibold">🎯 Goals</h1>
              <div className="flex items-center gap-2 ml-7  mt-2">
                {" "}
                <TbPointFilled className="text-sm" /> Blood group identification
                at camps
              </div>
              <div className="flex items-center gap-2 ml-7  mt-2">
                {" "}
                <TbPointFilled className="text-sm" /> Provide the right donor at
                the right time when blood is needed.
              </div>
              <div className="flex items-center gap-2 ml-7  mt-2">
                {" "}
                <TbPointFilled className="text-sm" /> Increase awareness of
                blood donation and grow the number of voluntary donors.
              </div>
              <div className="flex items-center gap-2 ml-7  mt-2">
                {" "}
                <TbPointFilled className="text-sm" /> Build an integrated,
                technology-supported blood donation ecosystem.
              </div>
              <div className="flex items-center gap-2 ml-7  mt-2">
                {" "}
                <TbPointFilled className="text-sm" /> Educate and encourage the
                public about the importance of donating blood.
              </div>
              <div className="flex items-center gap-2 ml-7  mt-2">
                {" "}
                <TbPointFilled className="text-sm" /> Recognize regular and
                active blood donors with appreciation and rewards.
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
