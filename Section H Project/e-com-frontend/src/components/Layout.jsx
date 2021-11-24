import { useEffect } from "react";
import Menu from "./Menu";

export default function Layout({ title = "Title", className, children }) {
  useEffect(
    () => {
      document.title = title;
    }, // eslint-disable-next-line
    []
  );
  return (
    <div>
      <div className="mb-3">
        <h3>
          <Menu />
        </h3>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
