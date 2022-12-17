import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row flex-1">
          {/* Sidebar */}
          <Sidebar />
          <>{props.children}</>
        </div>
      </div>
    </>
  );
}
