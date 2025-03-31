const OfflinePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">You are Offline</h1>
      <p className="text-gray-700 mb-4">
        Sorry, this page is not available offline. Please check your internet
        connection.
      </p>

      <div className="mt-6 p-4 bg-white rounded-md shadow-md max-w-md">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting Steps:</h2>
        <ul className="text-gray-600 text-left list-disc list-inside space-y-2">
          <li>Check if your Wi-Fi or mobile data is enabled.</li>
          <li>Try reloading the page after reconnecting.</li>
          <li>Restart your router if the issue persists.</li>
          <li>Open another website to see if the internet is working.</li>
          <li>Disable airplane mode if it is turned on.</li>
        </ul>
      </div>
    </div>
  );
};

export default OfflinePage;
