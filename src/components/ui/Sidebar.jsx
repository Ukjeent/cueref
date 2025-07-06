function Sidebar({ handleNavClick, activeNav }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">My Account</h2>
      <nav>
        <ul className="nav-menu">
          {["My page", "Previous uploads"].map((item) => (
            <li key={item} className="nav-item">
              <button
                className={`nav-link ${activeNav === item ? "active" : ""}`}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
