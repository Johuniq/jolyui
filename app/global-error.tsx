"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return (
    <html lang="en">
      <body className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md mx-auto p-8 bg-white/10 rounded-xl backdrop-blur-xs shadow-xl">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-300">{error.message}</p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
