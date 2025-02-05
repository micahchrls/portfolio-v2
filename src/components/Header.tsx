import ContentNav from "@/components/header-components/ContentNav";
import Profile from "@/components/header-components/Profile";
import SocMedNav from "@/components/header-components/SocMedNav";

const Header = () => {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <Profile />
        <ContentNav />
      </div>
      <SocMedNav />
    </header>
  );
};

export default Header;
