import Sidebar from "../sidebar/sidebar";

const Page = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-[#f8fafc]"></main>
    </div>
  );
};

export default Page;
