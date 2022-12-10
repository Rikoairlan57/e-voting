import React, { useState } from "react";
import Button from "./Button";
import { createRoot } from "react-dom/client";

interface Props {
  isOpen?: boolean;
  title?: string;
  subtitle?: string;
  positiveText?: string;
  negativeText?: string;
  onPositiveClick?: () => void;
  onNegativeClick?: () => void;
}

const Alert = (props: Props) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  return (
    <div
      className={`relative z-10 ${!isOpen && "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-zinc-900 bg-opacity-40 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all p-4 rounded-md">
            <div className="w-full p-5 text-center">
              <p className="text-2xl font-bold">{props.title || "Title"}</p>
              <p className="text-lg">{props.subtitle || "Sub Title"}</p>
              <div className={`space-x-3 mt-5`}>
                <button
                  className="text-sm bg-zinc-100 px-2 py-1 hover:bg-zinc-200"
                  onClick={() => {
                    props.onNegativeClick;
                    setIsOpen(false);
                  }}
                >
                  {props.negativeText || "Kembali"}
                </button>
                <Button
                  className={`${!props.onPositiveClick && "hidden"}`}
                  onClick={() => {
                    props.onPositiveClick && props.onPositiveClick();
                    setIsOpen(false);
                  }}
                  size="sm"
                  text={props.positiveText || "Ya"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
