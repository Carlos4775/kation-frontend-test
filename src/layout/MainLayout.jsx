import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ paddingBottom: "140px" }}>{children}</div>
    </div>
  );
}
