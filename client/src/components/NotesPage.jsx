import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNotes } from "../features/notes/notesSlice";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const NotesPage = () => {
  const dispatch = useDispatch();
  const { subjectId } = useParams();

  // Get notes from Redux state
  const notes = useSelector((state) => state.notes.notes);
  const loading = useSelector((state) => state.notes.loading);
  const error = useSelector((state) => state.notes.error);

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchNotes(subjectId));
    }
  }, [subjectId, dispatch]);

  const downloadFile = (fileUrl, fileName) => {
    fetch(fileUrl, {
      mode: "cors",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error("Download failed:", err));
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading notes...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Notes for Selected Semester
      </h2>
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-600 mb-4">{note.content}</p>
                <button
                  onClick={() =>
                    downloadFile(note.fileUrl, `${note.title}.pdf`)
                  }
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ArrowDownTrayIcon className="w-6 h-6 mr-2" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-4">
          No notes available for this semester.
        </p>
      )}
    </div>
  );
};

export default NotesPage;
