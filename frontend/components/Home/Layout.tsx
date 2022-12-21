import HomeNavbar from "./HomeNavbar";
import HomeFooter from "./HomeFooter";

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout(props: LayoutProps) {
  return (
    <>
      <HomeNavbar />
      <main>{props.children}</main>
      <HomeFooter />
    </>
  );
}
