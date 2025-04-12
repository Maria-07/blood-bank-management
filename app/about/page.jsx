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
              <p className="text-lg text-accent  mt-5">
                &quot;The best gift of humanity is blood – save lives by
                donating blood.&quot;
              </p>
            </div>
          </div>
          {/* <div className="py-5 bg-[#F2F2F2] rounded-xl shadow-md   px-5 "></div> */}

          <div className="px-2 sm:px-10 my-5 text-justify">
            {" "}
            <p className="mb-5">
              <span className="text-xl font-semibold text-secondary">
                Hemoglobin
              </span>{" "}
              is a digital blood donation platform initiated for the people of
              Nilphamari District, aiming to ensure fast, easy, and effective
              access to blood services. This initiative has been established and
              is operated under the personal vision, direct guidance, and strong
              efforts of the Honorable Deputy Commissioner of Nilphamari,{" "}
              <strong>Mr. Mohammad Nayiruzzaman.</strong> <br /> Under his
              leadership, a dedicated team within the District Administration is
              consistently working to ensure the success of this mission. The
              Civil Surgeon’s Office, Nilphamari is providing technical support
              for blood group testing and volunteer training, while members of
              the Bangladesh Scouts, Nilphamari District are serving selflessly
              as volunteers to push this humanitarian effort forward.
            </p>
            <p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
