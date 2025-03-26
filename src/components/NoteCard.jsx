import "../assets/css/card.css";

export const NoteCard = ({ onPreview, onUpdate, onDelete, note, selectedLanguage }) => {
  const handleListen = () => {
    const synth = window.speechSynthesis;
  
    // Stop any existing speech first
    if (synth.speaking) {
      synth.cancel();
      setTimeout(() => speakNote(), 200); 
    } else {
      speakNote();
    }
  };
  
  const speakNote = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(note?.title + ". " + note?.desc);

    const voices = synth.getVoices();
  
    let selectedVoice = voices.find((voice) => voice.lang === selectedLanguage);
  
    if (!selectedVoice) {
      const hindiVoice = voices.find((voice) => voice.lang.startsWith("hi"));
      utterance.voice = hindiVoice || voices[0]; // Prefer Hindi voice if available
    } else {
      utterance.voice = selectedVoice;
    }
  
    utterance.rate = 0.8;
  
    synth.speak(utterance);
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
            <div className="action-item" onClick={() => onUpdate(note)}>
              <i className="fa-solid fa-pen-to-square edit"></i>
            </div>
            <div className="action-item" onClick={() => onDelete(note?.id)}>
              <i className="fa-solid fa-trash-can delete"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
