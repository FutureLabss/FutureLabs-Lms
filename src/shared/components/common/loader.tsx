import useLoadingStore from "@/stores/loadingState";

export default function Loader() {
  const { isLoading, loadingContent: content } = useLoadingStore((state) => state);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-700 bg-opacity-80">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 4px solid #e7f6ec;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="mt-4 text-gray-500 text-center">
        {content?.title ? <p className="font-medium capitalize"> {content.title} </p> : null}
        {content?.text ? <p className="text-gray-500 text-sm capitalize"> {content.text} </p> : null}
      </div>
    </div>
  );
}
