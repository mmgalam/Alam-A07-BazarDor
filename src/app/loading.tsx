export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-[#f3f7f2]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-900/15 border-t-green-900" />

      <div className="text-center">
        <h2 className="text-lg font-semibold text-green-950">Loading...</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please wait while we prepare your page.
        </p>
      </div>
    </div>
  );
}
