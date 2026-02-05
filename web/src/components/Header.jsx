import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Header.css";

export default function Header({ searchValue, onSearchChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close menus when route changes via link click
  const closeAll = () => {
    setMobileOpen(false);
    setSubmenuOpen(false);
  };

  // Close menus when clicking outside (desktop + mobile)
  useEffect(() => {
    function onDocClick(e) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) {
        setMobileOpen(false);
        setSubmenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // If you close the mobile menu, also close submenu
  useEffect(() => {
    if (!mobileOpen) setSubmenuOpen(false);
  }, [mobileOpen]);

  return (
    <header className="header" ref={wrapperRef}>
      <div className="header-inner">
        {/* LEFT: nav */}
        <nav className={`nav ${mobileOpen ? "is-open" : ""}`} aria-label="Primary">
          <NavLink to="/lessons" className="nav-link" onClick={closeAll}>
            Lessons
          </NavLink>

          <div
            className={`dropdown ${submenuOpen ? "is-open" : ""}`}
            onMouseEnter={() => {
              // Desktop hover only (won't matter on mobile)
              if (window.innerWidth >= 769) setSubmenuOpen(true);
            }}
            onMouseLeave={() => {
              if (window.innerWidth >= 769) setSubmenuOpen(false);
            }}
          >
            <div className="dropdown-row">
              <NavLink
                to="/practice-tests"
                className="nav-link"
                onClick={() => {
                  // Navigate to overview AND close menus
                  closeAll();
                }}
              >
                Practice Tests
              </NavLink>

              {/* caret toggles submenu (especially for mobile) */}
              <button
                type="button"
                className="caret-btn"
                aria-label="Toggle practice tests menu"
                aria-expanded={submenuOpen}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSubmenuOpen((v) => !v);
                }}
              >
                ▾
              </button>
            </div>

            <div className="dropdown-menu" role="menu">
              <NavLink to="/practice-tests/test-01" className="dropdown-item" onClick={closeAll}>
                Practice Test 01
              </NavLink>
              <NavLink to="/practice-tests/test-02" className="dropdown-item" onClick={closeAll}>
                Practice Test 02
              </NavLink>
              <NavLink to="/practice-tests/test-03" className="dropdown-item" onClick={closeAll}>
                Practice Test 03
              </NavLink>
            </div>
          </div>

          {/* Mobile: search inside the open menu */}
          <div className="search-wrapper mobile-only">
            <input
              className="search-input"
              placeholder="Search topics..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </nav>

        {/* CENTER: title */}
        <h1 className="site-title">Learn CompTIA Project+</h1>

        {/* RIGHT: desktop search + hamburger */}
        <div className="right">
          <div className="search-wrapper desktop-only">
            <input
              className="search-input"
              placeholder="Search topics..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
