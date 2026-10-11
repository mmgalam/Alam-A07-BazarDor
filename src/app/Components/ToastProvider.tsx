"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss={false}
      limit={3}
      theme="colored"
      toastClassName="!mx-3 !mt-2 !rounded-lg !text-sm sm:!mx-0 sm:!mt-0"
    />
  );
}
