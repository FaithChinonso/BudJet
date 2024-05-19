import Image from "next/image";
import React from "react";

const EmptyTable = ({ columns }: any) => {
  return (
    <div className="w-full h-[400px] mt-10">
      <table className="w-full">
        <thead className="p-5 bg-[#F8FFFC]">
          <tr className="bg-[#F8FFFC]">
            {columns?.map((headd: any, index: any) => (
              <th
                className="font-medium text-sm text-secondary p-4 text-center"
                key={index}
              >
                {headd.name}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="">
          {/* <Image src={logo} alt="logo" className={styles.image} /> */}
        </div>
        <div className="text-semibold text-secondary ">No Data to Display</div>
      </div>
    </div>
  );
};

export default EmptyTable;
