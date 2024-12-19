
export default function Home() {
  return (
    <main className="flex flex-col items-center  min-h-screen py-20 ">
      <div className="p-4">
        <h1 className="p-4 text-4xl font-bold text-center text-blue-700">Share It Safe</h1>
        <p className="text-gray-500 text-center">
          Upload a file and a secure link will be generated for you
        </p>
      </div>
      <div className="mt-5 p-2 md:p-4  flex flex-col md:flex-row items-center">
        <input
          type="file"
          className="border border-gray-300 rounded-md p-2 text-gray-400 w-full md:w-auto"
        />
        <button className="bg-blue-500 py-2 px-6 rounded-sm text-white font-bold mt-4 md:mt-0 md:ml-4">
          Share
        </button>
      </div>
    </main>
  );
}