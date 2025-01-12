"use client";
import { Campaigns } from "@/src/Components/Data/Data";
import { Modal, Select } from "antd";
import { useForm } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";

const CampaignEditModal = ({ handleClose, clicked, record }) => {
  const { Address, EndDate, StartDate, Banner, Name, VolunteerList } = record;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <>
        {" "}
        <Modal
          open={clicked}
          centered
          footer={null}
          //   bodyStyle={{ padding: "0" }}
          width={600}
          closable={false}
          className="box"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-semibold tracking-tight">
                Create a campaign
              </h1>

              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 my-3 mr-2 gap-x-2 gap-y-3">
                <div className="sm:col-span-2">
                  <label className="label flex items-center">
                    <div className="modal-label-name">Enter Campaign Name</div>
                  </label>
                  <input
                    defaultValue={Name}
                    type="text"
                    name="Name"
                    className="modal-input-field ml-1 w-full"
                    {...register("Name")}
                  />
                </div>
                <div className="">
                  <label className="label flex items-center">
                    <div className="modal-label-name">Start Date</div>
                  </label>
                  <input
                    defaultValue={StartDate}
                    type="date"
                    name="StartDate"
                    className="modal-input-field ml-1 w-full"
                    {...register("StartDate")}
                  />
                </div>
                <div className="">
                  <label className="label flex items-center">
                    <div className="modal-label-name">End Date</div>
                  </label>
                  <input
                    defaultValue={EndDate}
                    type="date"
                    name="EndDate"
                    className="modal-input-field ml-1 w-full"
                    {...register("EndDate")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label flex items-center">
                    <div className="modal-label-name">Address</div>
                  </label>
                  <input
                    defaultValue={Address}
                    type="text"
                    name="Address"
                    className="modal-input-field ml-1 w-full"
                    {...register("Address")}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label flex items-center">
                    <div className="modal-label-name">Select Volunteers</div>
                    <span className="text-sky-500">*</span>
                  </label>
                  <Select
                    mode="multiple"
                    maxTagCount="responsive"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    size="large"
                    placeholder="Please select"
                    defaultValue={VolunteerList}
                    onChange={handleChange}
                    className="ml-1"
                    options={Campaigns?.VolunteerList}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="label flex items-center">
                    <div className="modal-label-name">Campaign Banner</div>
                  </label>
                  <input
                    defaultValue={Banner}
                    type="file"
                    name="Banner"
                    className="modal-input-field ml-1 w-full"
                    {...register("Banner")}
                  />
                </div>
              </div>
              <div className="bg-gray-200 py-[1px] mt-10"></div>
              <div className="flex items-end justify-end gap-2 mt-2">
                <button
                  type="submit"
                  className=" border-sky-600 flex items-center border rounded-sm"
                >
                  <MdDone className=" text-white bg-sky-700  px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-sky-500 transition-all hover:bg-sky-600 text-white text-xs">
                    Edit Campaign
                  </span>
                </button>
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
            </form>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default CampaignEditModal;
