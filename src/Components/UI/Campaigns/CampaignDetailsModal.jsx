import formatDate from "@/src/shared/ReusedFunctions";
import { Image, Modal } from "antd";
import React from "react";
import { BiSolidInstitution } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosPeople, IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdOutlineDateRange } from "react-icons/md";

const CampaignDetailsModal = ({ handleClose, clicked, record }) => {
  const {
    address,
    institute,
    bannerUrl,
    startDate,
    endDate,
    name,
    volunteerList,
  } = record;

  return (
    <div>
      {" "}
      <div>
        <Modal
          open={clicked}
          centered
          footer={null}
          width={600}
          closable={false}
          className="box"
        >
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold tracking-tight">
                Campaign Details
              </h1>
              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] my-3"></div>

            <form>
              <div>
                <div className="border-[1px] p-2 rounded-md mb-5">
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="h-[100%] overflow-hidden ">
                      <Image
                        preview={false}
                        className="border object-cover w-full h-full"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${bannerUrl}`}
                        // width={80}
                        // height={80}
                        alt="Picture of the author"
                      />
                    </div>

                    <div>
                      <h1 className="text-capitalize font-semibold text-lg">
                        {name}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="border-[1px] p-5 rounded-md mb-5">
                  {" "}
                  <div className="flex gap-2 my-3 text-accent ">
                    <BiSolidInstitution className="text-primary text-xl" />{" "}
                    <div>
                      {" "}
                      <span className="text-black font-semibold">
                        Institute :
                      </span>{" "}
                      {institute}
                    </div>
                  </div>{" "}
                  <div className="flex gap-2 my-3 text-accent ">
                    <FaMapLocationDot className="text-primary text-xl" />{" "}
                    <div>
                      {" "}
                      <span className="text-black font-semibold">
                        Address :
                      </span>{" "}
                     
                      {address.length > 55 ? `${address.slice(0, 55)}...` : address}
                    </div>
                  </div>
                  <div className="flex gap-2 my-3">
                    <MdOutlineDateRange className="text-primary text-xl" />{" "}
                    <div className="text-sm text-accent ">
                      <span className="text-black font-semibold">
                        Start at :
                      </span>{" "}
                      {formatDate(startDate)}
                    </div>
                  </div>
                  <div className="flex gap-2 my-3">
                    <MdOutlineDateRange className="text-primary text-xl" />{" "}
                    <div className="text-sm text-accent ">
                      <span className="text-black font-semibold">End at :</span>{" "}
                      {formatDate(endDate)}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <IoIosPeople className="text-primary text-xl" />{" "}
                    <div className="text-sm text-accent ">
                      <span className="text-black font-semibold">
                        Volunteers :
                      </span>{" "}
                      {volunteerList?.length || 0}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-end gap-2 mt-2">
                <button
                  onClick={handleClose}
                  className="border-secondary flex items-center border rounded-sm"
                >
                  <MdDeleteOutline className="text-white bg-secondary px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                    Cancel
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CampaignDetailsModal;
