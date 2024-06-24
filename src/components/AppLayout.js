import Header from "./Header";
import MainBody from "./MainBody";

const AppLayout = () => {
  return (
    <div className="mx-2 text-sm lg:text-[16px] text-slate-800">
      <Header />
      <MainBody />
    </div>
  );
};

export default AppLayout;
