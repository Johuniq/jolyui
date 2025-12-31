"use client";

import { useState } from "react";
import {
  AnimatedToastProvider,
  usePromiseToast,
} from "@/registry/default/ui/animated-toast";

function PromiseToastDemoContent() {
  const promiseToast = usePromiseToast();
  const [result, setResult] = useState<string>("");

  const simulateAsyncOperation = (shouldSucceed: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldSucceed) {
          resolve("Operation completed successfully!");
        } else {
          reject(new Error("Operation failed!"));
        }
      }, 2000);
    });
  };

  const handleSuccess = async () => {
    try {
      const data = await promiseToast({
        promise: simulateAsyncOperation(true),
        loading: "Processing your request...",
        success: (result) => `Success: ${result}`,
        error: (err) => `Error: ${err.message}`,
      });
      setResult(data);
    } catch (_error) {
      // Error already handled by toast
    }
  };

  const handleError = async () => {
    try {
      const data = await promiseToast({
        promise: simulateAsyncOperation(false),
        loading: "Processing your request...",
        success: (result) => `Success: ${result}`,
        error: (err) => `Error: ${err.message}`,
      });
      setResult(data);
    } catch (_error) {
      // Error already handled by toast
    }
  };

  return (
    <div className="p-8">
      <p className="mb-4 text-muted-foreground">
        Click buttons to simulate async operations with toast feedback.
      </p>

      <div className="mb-4 flex flex-wrap gap-4">
        <button
          onClick={handleSuccess}
          className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
        >
          Simulate Success
        </button>
        <button
          onClick={handleError}
          className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
        >
          Simulate Error
        </button>
      </div>

      {result && (
        <div className="rounded-md bg-muted p-4">
          <p className="font-medium text-sm">Result:</p>
          <p className="text-muted-foreground text-sm">{result}</p>
        </div>
      )}
    </div>
  );
}

export default function AnimatedToastPromiseDemo() {
  return (
    <AnimatedToastProvider position="top-center">
      <PromiseToastDemoContent />
    </AnimatedToastProvider>
  );
}
