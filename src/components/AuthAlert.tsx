
import React from "react";
import { toast } from "sonner";

interface AuthAlertProps {
  type: "success" | "error";
  message: string;
}

export const showAuthAlert = ({ type, message }: AuthAlertProps) => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
