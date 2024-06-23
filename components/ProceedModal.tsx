"use client";
import React from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  //   formTarget: FormTarget;
}

export default function ProceedModal({ open, setOpen }: Props) {
  return (
    <>
      <Transition show={open}>
        <Dialog className="relative z-30" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-[18px] bg-[#F5F3FF] text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-[472px]">
                  <div className=" flex justify-between px-[24px] pt-[20px] pb-[12px] w-full bg-[#755AE2] items-center">
                    <p className=" text-white font-medium">Start assessment</p>

                    <button className=" bg-[rgba(245,243,255,0.2)] text-white py-2 px-[22px] text-xs rounded-[9px]">
                      Close{" "}
                    </button>
                  </div>
                  <div className=" mt-[34px] mb-[50px]">
                    <div className=" mx-auto max-w-[335px]">
                      <h3 className=" text-[20px] text-[#755AE2] text-center mb-2">
                        Proceed to start assessment
                      </h3>
                      <p className=" text-center text-sm text-[#675E8B]">
                        Kindly keep to the rules of the assessment and sit up,
                        stay in front of your camera/webcam and start your
                        assessment. This includes object detection.
                      </p>
                    </div>
                  </div>
                  <div className=" rounded-[18px] w-full bg-white flex justify-end px-[34px] py-[17px]">
                    <Link href={"/exam-object-detection"}>
                      <button className=" py-[12px] px-[34px] text-white bg-[#755AE2] text-base rounded-[10px]">
                        Proceed
                      </button>
                    </Link>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
