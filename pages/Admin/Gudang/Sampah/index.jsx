import AdminLayout from "../../../../components/Layouts/AdminLayout";
import DetailSampah from "./DetailSampah";
import TambahDataSampah from "./TambahDataSampah";

function index() {
  return (
    <AdminLayout>
      <div className="p-2  mb-4 shadow-lg rounded-lg text-pink-200 font-light items-center w-12 bg-white">
        <img src="/logo/recycling.png" alt="sampah" />
      </div>
      <div className="grid  md:grid-cols-3 gap-2 lg:gap-8">
        <DetailSampah />
        <TambahDataSampah />
      </div>
    </AdminLayout>
  );
}

export default index;
