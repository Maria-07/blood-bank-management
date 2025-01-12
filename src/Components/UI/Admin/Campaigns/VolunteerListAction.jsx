"use client";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import Volunteer from "../../Volunteers/Volunteers/Volunteer";
import CampaignVolunteer from "./CampaignVolunteer";
const VolunteerListAction = ({ handleClose, clicked }) => {
  return (
    <div>
      <>
        {" "}
        <Modal
          open={clicked}
          centered
          footer={null}
          // bodyStyle={{ padding: "0" }}
          width={600}
          closable={false}
          className="box"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-semibold tracking-tight">
                Our ALl volunteers
              </h1>

              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>
            <div>
              <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 mt-10">
                <CampaignVolunteer></CampaignVolunteer>
                <CampaignVolunteer></CampaignVolunteer>
                <CampaignVolunteer></CampaignVolunteer>
                <CampaignVolunteer></CampaignVolunteer>
                <CampaignVolunteer></CampaignVolunteer>
                <CampaignVolunteer></CampaignVolunteer>
              </div>
            </div>
            <div className="bg-gray-200 py-[1px] mt-10"></div>
            <div className="flex items-end justify-end gap-2 mt-2">
              <button
                onClick={handleClose}
                className=" border-secondary flex items-center border rounded-sm"
              >
                <MdDeleteOutline className=" text-white bg-secondary  px-1 py-[2px] text-[28px]" />
                <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default VolunteerListAction;
