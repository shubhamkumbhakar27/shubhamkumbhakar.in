import cn from "classnames";
import { ReactNode } from "react";

import help from "../../../public/images/river-riddle/help.jpeg";

import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Button = ({ children, onClick }: any) => {
  return <button onClick={onClick}>{children}</button>;
};

type Props = {
  onClose?(): void;
  onProceed(): void;
  zIndex?: number;
  showPattern?: boolean;
  children?: ReactNode;
};

function HelpModal({
  children,
  onClose,
  onProceed,
  zIndex = 10,
  showPattern = false,
}: Props) {
  const modalZindex = `z-${zIndex}`;
  const overlayZindex = `z-${zIndex + 10}`;

  return (
    <div className={`${modalZindex} fixed inset-0 border-2 border-green-500`}>
      <div className="fixed inset-0 transition-opacity">
        <div
          className="absolute inset-0 bg-black opacity-75"
          onClick={onClose}
        ></div>
      </div>

      <div
        className={cn(
          `${overlayZindex} min-w-xl relative mx-auto max-h-screen max-w-[90%] overflow-y-scroll rounded-lg bg-gray-900 p-4 md:max-w-2xl md:rounded-lg md:border md:border-gray-700`
        )}
        style={{ transform: "translateY(-50%)", top: "50%" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex">
            <h1 className="rubik mx-8 text-center text-xl font-bold">
              <p>Instructions:</p>
            </h1>
          </div>

          <div
            className={cn("grow-0", {
              hidden: onClose === undefined ? true : false,
            })}
          >
            <Button color="gray" size="small" onClick={onClose}>
              <XMarkIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center">
          <div className="w-full">
            <div className="flex flex-col justify-center gap-2 px-4">
              <div
                className="overflow-scroll"
                style={{
                  height: "50vh",
                }}
              >
                <Image src={help.src} alt="" width={500} height={500} />
              </div>
            </div>
            <div className="m-auto mt-4 flex w-full justify-center">
              <Button
                color="gray"
                //className="btn btn-primary flex cursor-pointer justify-center gap-2 text-center text-xs"
                onClick={onProceed}
                size="small"
              >
                {/* <PlayIcon className="h-4 w-4" /> */}
                Proceed to play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
