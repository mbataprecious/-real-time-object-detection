import React from "react";
import { Container } from "./Container";
import Image from "next/image";
import SvgIconStyle from "./SvgIconStyle";

const Navbar = () => {
  return (
    <div className="bg-white pb-3 pt-6">
      <Container className=" flex justify-between">
        <div className="flex">
          <Image
            src={"/assets/skill-logo.png"}
            alt="logo"
            width={63}
            height={62}
            className=" mr-3"
          />
          <div className="">
            <h6 className=" text-[20px] leading-[26.04px]">
              Frontend developer
            </h6>
            <p className="text-[#8C8CA1] text-sm">Skill assessment test</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" flex items-center py-3 px-[23px] bg-[#ECE8FF] mr-2.5 rounded-lg">
            <div className="w-6 h-6 mr-2.5 bg-[#E6E0FF] flex justify-center items-center rounded-full">
              <SvgIconStyle
                src={"/assets/timer-start.svg"}
                className="!h-4 !w-4 text-[#755AE2]"
              />
            </div>
            <h6 className=" font-bold text-base text-[#755AE2]">
              29:10 <span className=" font-medium text-sm">time left</span>
            </h6>
          </div>
          <div className="w-[30px] h-[30px] bg-[#ECE8FF] flex justify-center items-center rounded-full">
            <SvgIconStyle
              src={"/assets/eye.svg"}
              className=" h-5 w-5 text-[#755AE2]"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
