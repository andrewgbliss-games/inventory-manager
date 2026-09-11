"use client";

import React, { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";

interface ToastProps {
  message: string;
  duration?: number;
  onTimeout?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onTimeout,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onTimeout?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onTimeout]);

  if (!isVisible) {
    return null;
  }

  return (
    <Alert className="fixed bottom-4 right-4 w-auto max-w-sm">{message}</Alert>
  );
};
