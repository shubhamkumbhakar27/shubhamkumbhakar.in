import cn from "classnames";
import { ReactNode } from "react";

const Button = ({ children, onClick }: any) => {
  return <button onClick={onClick}>{children}</button>;
};

import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  onClose?(): void;
  zIndex?: number;
  showPattern?: boolean;
  title?: string;
  children?: ReactNode;
};

function Modal({
  children,
  onClose,
  zIndex = 10,
  showPattern = false,
  title = "",
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
          `${overlayZindex} relative mx-auto max-h-screen w-fit max-w-[70%] overflow-y-scroll rounded-lg bg-gray-900 p-4 md:max-w-2xl md:rounded-lg md:border md:border-gray-700`
        )}
        style={{ transform: "translateY(-50%)", top: "50%" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex">
            <h1 className="rubik mx-8 text-center text-3xl font-bold"></h1>
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

        <div className="flex flex-col items-center">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
