import React from "react";
import { motion } from "framer-motion";

export default function Modal({ ModalProps }) {
  const { title, message, type, onCancel, onConfirm } = ModalProps;

  // Define modal styles and buttons dynamically based on type
  const modalStyles = {
    info: {
      borderColor: "border-blue-400",
      textColor: "text-blue-400",
      icon: "ℹ️",
    },
    success: {
      borderColor: "border-green-400",
      textColor: "text-green-400",
      icon: "✅",
    },
    warning: {
      borderColor: "border-yellow-400",
      textColor: "text-yellow-400",
      icon: "⚠️",
    },
    error: {
      borderColor: "border-red-400",
      textColor: "text-red-400",
      icon: "❌",
    },
  };

  const currentStyle = modalStyles[type] || modalStyles.info; // Default to 'info'

  return (
    <aside className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className={`grid max-w-lg w-full grid-rows-4 grid-cols-3 bg-white border-2 ${currentStyle.borderColor} shadow-lg rounded-md`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Header */}
        <div className={`row-span-1 col-span-3 flex items-center p-4 ${currentStyle.textColor}`}>
          <span className="text-2xl">{currentStyle.icon}</span>
          <h1 className="ml-2 text-xl font-bold">{title}</h1>
        </div>

        {/* Body */}
        <p className="row-span-2 col-span-3 p-4 text-gray-700">{message}</p>

        {/* Footer Buttons */}
        <div className="row-span-1 col-span-3 flex justify-end gap-4 p-4">
          {type === "OK" && (
            <>
              <button
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-200"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-400 px-4 py-2 text-white hover:bg-blue-500"
                onClick={onConfirm}
              >
                Okay
              </button>
            </>
          )}
          {type === "error" && (
            <button
              className="rounded-md bg-red-400 px-4 py-2 text-white hover:bg-red-500"
              onClick={onCancel}
            >
              Dismiss
            </button>
          )}
        </div>
      </motion.div>
    </aside>
  );
}
