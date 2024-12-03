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
    <aside className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className={`z-50 ml-20 flex w-80 max-w-lg flex-col border-2 bg-white p-4 md:ml-0 md:w-full ${currentStyle.borderColor} rounded-md shadow-lg`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Header */}
        <div className={`flex items-center p-4 ${currentStyle.textColor}`}>
          <span className="text-2xl">{currentStyle.icon}</span>
          <h1 className="ml-2 text-xl font-bold">{title}</h1>
        </div>

        {/* Body */}
        <div className="p-4 font-semibold text-neutral-400">
          {message && <p>{message}</p>}
          {children && <div>{children}</div>}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between gap-4 px-4 py-1 text-sm">
          {(type === "OK" || type === "warning") && (
            <>
              <button
                className="rounded-md border border-gray-300 px-4 text-gray-600 hover:bg-gray-200"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className={`rounded-md px-8 py-2 font-bold text-white ${
                  type === "warning" ? "bg-yellow-400 hover:bg-yellow-500" : "bg-blue-400 hover:bg-blue-500"
                }`}
                onClick={onConfirm}
              >
                Go
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
