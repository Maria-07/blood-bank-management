import { Image } from "antd";
import Link from "next/link";
import React from "react";

const NewsCard = () => {
  //   const { title, createdAt, user_name, id, img } = news;
  return (
    <div>
      {" "}
      <div>
        <div className="">
          <div className="h-[270px] w-[100%] overflow-hidden">
            <Image
              src={
                "https://storage.googleapis.com/beckermedia/2022/10/da2bf0d3-medical-assistant-draw-blood.jpg"
              }
              width={""}
              height={""}
              alt="Picture of the author"
            ></Image>
          </div>
          <div>
            <Link href={`/blogs`}>
              {" "}
              <div className="text-base my-5 text-black font-semibold hover:text-primary">
                Lörem ipsum mis morotsmobb conscious consumerism och povis.
              </div>
            </Link>

            <h2 className="text-sm text-dark ">
              {(() => {
                try {
                  const createdAtDate = new Date("");
                  return format(createdAtDate, "MMM dd, yyyy");
                } catch (error) {
                  return "Posted Time Not Found";
                }
              })()}
              | <span className="text-accent"></span>
            </h2>

            <p className="text-[15px] h-[60px] mt-5 mb-10">
              {/*    {blog.length > 80 ? `${blog.slice(0, 80)} ...` : blog}
               */}{" "}
              Lörem ipsum lys sode asande i prevånde men bior. Geosiv RFID Hugo
              Nilsson men susade cirkulär handel. Trelanade vid är Emil Persson
              utan Bo Candia dov. Unika besökare niskade teskade, eller
              sodåmiligt reska. Jåktigt teras innovationsekosystem.
            </p>
            <Link href={`/blogs`}>
              <button className="text-sm hover:text-secondary text-accent border-b-2 hover:border-secondary">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
