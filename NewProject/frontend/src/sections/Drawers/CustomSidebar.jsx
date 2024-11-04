import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar collapsed={collapsed}>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10 }}>
        <div>
          <button
            className="sb-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            Collapse
          </button>
        </div>
      </main>
    </div>
  );
};

export default CustomSidebar;
