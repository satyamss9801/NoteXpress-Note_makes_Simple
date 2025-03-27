import { useState, useEffect, useRef } from "react";
import "../assets/css/upsert.css";
import { v4 as getID } from "uuid";

export const UpsertNote = ({ setOpen, note, createNote, updateNote }) => {
  const [title, setTitle] = useState(note ? note?.title : "");
  const [desc, setDesc] = useState(note ? note?.desc : "");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setDesc((prevDesc) => prevDesc + finalTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognitionRef.current.stop();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const clearInputs = () => {
    setTitle("");
    setDesc("");
  };

  const handleClear = (event) => {
    event.preventDefault();
    clearInputs();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (note) {
      updateNote({
        ...note,
        title,
        desc,
      });
    } else {
      createNote({
        id: getID(),
        title,
        desc,
        createdAt: new Date().toDateString(),
      });
    }
    clearInputs();
    setOpen(false);
  };

  return (
    <div className="upsert-note">
      <div className="upsert-wrapper">
        <div className="upsert-header">
          <h2 className="heading">{note ? "Update Note" : "Add Note"}</h2>
          <div className="close-btn" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <form className="upsert-form" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Title"
            className="input-form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="textarea-form"
            placeholder="Enter your note"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="upsert-actions">
            <button className="clear-btn rounded-btn" onClick={handleClear}>
              Clear
            </button>
            <button
              type="button"
              className={`voice-btn rounded-btn ${isListening ? "active" : ""}`}
              onClick={toggleListening}
            >
              {isListening ? "Stop Listening" : "Start Listening"}
            </button>
            <button type="submit" className="save-btn rounded-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
