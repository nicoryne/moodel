import React from "react"
import { motion } from "framer-motion"

export default function Modal({ ModalProps }) {
  const { title, message, type, onCancel, onConfirm, children } = ModalProps

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
  }

  const currentStyle = modalStyles[type] || modalStyles.info

  return (
    <aside className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className={`ml-20 grid w-80 max-w-lg grid-cols-3 grid-rows-4 border-2 bg-white md:ml-0 md:w-full ${currentStyle.borderColor} rounded-md shadow-lg`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Header */}
        <div className={`col-span-3 row-span-1 flex items-center p-4 ${currentStyle.textColor}`}>
          <span className="text-2xl">{currentStyle.icon}</span>
          <h1 className="ml-2 text-xl font-bold">{title}</h1>
        </div>

        {/* Body */}
        <div className="col-span-3 row-span-2 p-4 text-gray-700">
          {message && <p>{message}</p>}
          {children && <div>{children}</div>}
        </div>

        {/* Footer Buttons */}
        <div className="col-span-3 row-span-1 flex justify-end gap-4 p-6">
          {(type === "OK" || type === "warning") && (
            <>
              <button
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-200"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-400 px-8 py-2 font-bold text-white hover:bg-blue-500"
                onClick={onConfirm}
              >
                Okay
              </button>
            </>
          )}
          {type === "error" && (
            <button
              className="rounded-md bg-red-400 px-4 py-2 font-bold text-white hover:bg-red-500"
              onClick={onCancel}
            >
              Dismiss
            </button>
          )}
        </div>
      </motion.div>
    </aside>
  )
}
