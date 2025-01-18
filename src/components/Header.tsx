import ContentNav from "./main/ContentNav";
import Profile from "./main/Profile";

const Header = () => {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:overflow-hidden lg:py-4 border-">
      <section>
        <Profile />
        <ContentNav />
      </section>
    </header>
  );
};

export default Header;
