import "../assets/css/card.css";
import { useState } from "react";

export const NoteCard = ({ onPreview, onUpdate, onDelete, note, selectedLanguage }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  let synth = window.speechSynthesis;
  let isSpeaking = false; // Track speaking state
  let utterance = null;

  const handleListen = () => {
    if (isSpeaking) {
      // Stop speaking immediately when clicked again
      synth.cancel();
      isSpeaking = false;
    } else {
      // Start speaking
      speakNote();
    }
  };

  const speakNote = () => {
    utterance = new SpeechSynthesisUtterance(note?.title + ". " + note?.desc);

    const voices = synth.getVoices();
    let selectedVoice = voices.find((voice) => voice.lang === selectedLanguage);

    if (!selectedVoice) {
      const hindiVoice = voices.find((voice) => voice.lang.startsWith("hi"));
      utterance.voice = hindiVoice || voices[0]; // Prefer Hindi voice if available
    } else {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 0.8;

    utterance.onend = () => {
      isSpeaking = false; // Reset when speech ends
    };

    synth.speak(utterance);
    isSpeaking = true; // Mark as speaking
  };

  const handleCopy = () => {
    const textToCopy = `${note?.title}\n\n${note?.desc}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Hide after 2 seconds
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <div className="note-card">
      <div className="note-card-wrapper">
        <div className="card-header">
          <h2 className="card-title" onClick={() => onPreview(note)}>
            {note?.title}
          </h2>
          <button className="listen-btn" onClick={handleListen}>
            <i className="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div className="card-body">
          <p>{note?.desc}</p>
        </div>
        <span className="card-details" onClick={() => onPreview(note)}>
          read more
        </span>
        <div className="card-footer">
          <span className="card-timeline">{note?.createdAt}</span>
          <div className="card-actions">
            <div className="action-item" onClick={handleCopy}>
              <i className="fa-solid fa-copy copy"></i>
            </div>
            <div className="action-item" onClick={() => onUpdate(note)}>
              <i className="fa-solid fa-pen-to-square edit"></i>
            </div>
            <div className="action-item" onClick={() => onDelete(note?.id)}>
              <i className="fa-solid fa-trash-can delete"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Success message pop-up */}
      {copySuccess && (
        <div className="copy-toast">✅ Note Copied Successfully!</div>
      )}
    </div>
  );
};
