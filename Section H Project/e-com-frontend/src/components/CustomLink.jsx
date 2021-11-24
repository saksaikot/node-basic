import { Link, useResolvedPath, useMatch } from "react-router-dom";

function CustomLink({ children, to, className, ...props }) {
  let resolved = useResolvedPath(to);
  let style = useMatch({ path: resolved.pathname, end: true })
    ? { color: "#f90" }
    : { color: "grey" };

  return (
    <div>
      <Link
        // style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Link>
      {/* {match && " (active)"} */}
    </div>
  );
}

export default CustomLink;
