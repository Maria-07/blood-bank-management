import React from "react";
import bloodBank from "@/src/assets/Image/bloodBank.png";
import Image from "next/image";
import Initiators from "@/src/Components/UI/Volunteers/Initiators/Initiators";
import Volunteers from "@/src/Components/UI/Volunteers/Volunteers/Volunteers";
import { useGetAllApprovedVolunteersQuery } from "@/src/redux/features/volunteers/volunteers";

const VolunteerPage = () => {
  return (
    <div>
      {" "}
      <div className="md:w-[90%] sm:mx-auto ">
        <div className="pt-8 bg-[#F2F2F2] rounded-xl shadow-md py-2  px-5 ">
          <div className="md:w-[100%] sm:mx-auto grid sm:grid-cols-2 grid-cols-1 gap-3 items-center justify-between">
            <div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sm:pl-10"
            >
              <h1 className="font-bold lg:text-7xl text-4xl font-primary">
                Volunteers
              </h1>
              <hr className="p-[2px] bg-primary w-[22%]" />
              <p className="text-sm text-accent lg:w-[55%] my-3">
                Search for blood donors in your area quickly and conveniently.
                Filter results by blood group.
              </p>
            </div>

            <div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src={bloodBank}
                width={500}
                height={600}
                alt="Picture of the author"
              ></Image>
            </div>
          </div>
        </div>

        <h1 className=" lg:text-5xl text-4xl font-semibold  text-center mt-20">
          Our Respected Initiators
        </h1>
        <div>
          <Initiators></Initiators>
        </div>
      </div>
      <div className="my-10 bg-[#F2F2F2] py-10">
        <h1 className=" lg:text-5xl text-4xl font-semibold  text-center mt-10">
          Volunteers
        </h1>

        <div className="md:w-[90%] sm:mx-auto">
          <Volunteers></Volunteers>
        </div>
      </div>
      <div className="md:w-[90%] sm:mx-auto my-20">
        <div className="Volunteer-bg gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
          <div>
            {" "}
            <h1 className=" lg:text-6xl text-4xl sm:w-[80%] font-semibold mt-[10%] ml-[10%] p-10">
              Apply to be a volunteer instead ?
            </h1>
            <div className="ml-[10%] px-12">
              {" "}
              <button className="bb-input-button ">Apply Here</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
