import { useState, useEffect } from "react";
import "../assets/css/navbar.css";

export const Navbar = ({
  setOpen,
  state,
  dispatch,
  palettes,
  currentPalette,
  setCurrentPalette,
  setSelectedLanguage, // Prop to update selected language
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [onPalette, setOnPalette] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const fetchVoices = () => {
      const synthVoices = window.speechSynthesis.getVoices();
      setVoices(synthVoices);
    };
  
    fetchVoices();
    window.speechSynthesis.onvoiceschanged = fetchVoices;
  }, []);
  

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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="nav-options">
          <div className="nav-icon">
            {/* Theme Palette */}
            <div className={`palettes ${onPalette && "active"}`}>
              {palettes.map((palette) => (
                <div
                  onClick={() => {
                    setCurrentPalette(palette);
                    dispatch({ type: "SET_PALETTE", payload: palette });
                  }}
                  key={palette.id}
                  style={{ backgroundColor: palette.color }}
                  className={`palette-item ${currentPalette.id === palette.id && "active"}`}
                ></div>
              ))}
            </div>
            <i onClick={() => setOnPalette((prev) => !prev)} className="fa-solid fa-circle-half-stroke"></i>
          </div>

          <div className="nav-icon" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-plus"></i>
          </div>
        </div>
      </div>
      {/* Language Selector */}
      <select className="language-selector" onChange={(e) => setSelectedLanguage(e.target.value)}>
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
    </div>
  );
};
