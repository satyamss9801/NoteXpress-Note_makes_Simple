import { useState, useEffect } from "react";
import "../assets/css/navbar.css";

export const Navbar = ({
  setOpen,
  setSearch,
  state,
  dispatch,
  palettes,
  currentPalette,
  setCurrentPalette,
}) => {
  const [onPalette, setOnPalette] = useState(false);

  return (
    <div className={`navbar ${state?.palette ? state.palette.name : currentPalette?.name}`}>
      <div className="nav-wrapper container">
        <span className="logo">NoteXpress</span>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Notes..."
            onChange={(e) => setSearch(e.target.value)} // Fix: Directly update search in App.jsx
          />
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="nav-options">
          {/* Theme Palette Selector */}
          <div className="nav-icon">
            <div className={`palettes ${onPalette && "active"}`}>
              {palettes.map((palette) => (
                <div
                  key={palette.id}
                  onClick={() => {
                    setCurrentPalette(palette);
                    dispatch({ type: "SET_PALETTE", payload: palette });
                  }}
                  style={{ backgroundColor: palette.color }}
                  className={`palette-item ${currentPalette.id === palette.id ? "active" : ""}`}
                ></div>
              ))}
            </div>
            <i onClick={() => setOnPalette((prev) => !prev)} className="fa-solid fa-circle-half-stroke"></i>
          </div>

          {/* Add Note Button */}
          <div className="nav-icon" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
