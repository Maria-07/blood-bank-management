import { Modal } from "antd";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useAddReviewMutation } from "@/src/redux/features/review/review";
import { toast } from "react-toastify";
import { useTranslation } from "@/src/Hook/useTranslation";

const AddReviewModal = ({ handleClose, clicked }) => {
  const { t } = useTranslation();
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await addReview(data);
      console.log(res);

      if (res?.data?.data.isSuccess) {
        toast.success(res.data.data.message);
        handleClose();
        reset();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="">
        {" "}
        <Modal
          open={clicked}
          centered
          footer={null}
          width={550}
          closable={false}
          className="box"
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-xl  font-semibold tracking-tight">
                {t("reviews.addReview")}
              </h1>

              <IoMdCloseCircleOutline
                onClick={handleClose}
                className="text-gray-500 text-2xl hover:text-primary"
              />
            </div>

            <div className="bg-gray-200 pt-[1px] mt-3"></div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2 my-5">
                <label className="label flex items-center">
                  <div className="modal-label-name">
                    {t("reviews.writeYourReview")}
                  </div>
                </label>
                <textarea
                  type="text"
                  id="review"
                  name="review"
                  placeholder={t("reviews.writeYourReview")}
                  rows={4}
                  className="modal-input-field ml-1 w-full"
                  {...register("reviewMessage")}
                />
              </div>
              <div className="flex items-end justify-end gap-2 mt-2">
                <button
                  type="submit"
                  className="border-sky-600 flex items-center border rounded-sm"
                >
                  <MdDone className="text-white bg-sky-700 px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-sky-500 transition-all hover:bg-sky-600 text-white text-xs">
                    {t("reviews.addReview")}
                  </span>
                </button>
                <button
                  onClick={handleClose}
                  className="border-secondary flex items-center border rounded-sm"
                >
                  <MdDeleteOutline className="text-white bg-secondary px-1 py-[2px] text-[28px]" />
                  <span className="px-2 py-[6px] bg-primary transition-all hover:bg-secondary text-white text-xs">
                    {t("reviews.cancel")}
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

export default AddReviewModal;
