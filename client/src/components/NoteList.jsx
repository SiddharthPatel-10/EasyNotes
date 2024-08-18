// import { useState } from 'react';
// import axios from 'axios';
// import SelectionForm from './SelectionForm';

// const NotesList = () => {
//   const [notes, setNotes] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState('');

//   const fetchNotes = async (subjectId) => {
//     try {
//       const response = await axios.get(`/api/notes?subject=${subjectId}`);
//       setNotes(response.data);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <SelectionForm onSubjectSelect={(subjectId) => {
//         setSelectedSubject(subjectId);
//         fetchNotes(subjectId);
//       }} />
//       {notes.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-4">Notes for the Selected Subject</h2>
//           <ul className="space-y-4">
//             {notes.map(note => (
//               <li key={note._id} className="p-4 border rounded shadow">
//                 <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
//                 <a href={note.fileUrl} download className="text-blue-500 underline">
//                   Download
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotesList;



























// import React from 'react';
// import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchNotes } from '../features/notes/notesSlice';

// const NotesList = () => {
//   const dispatch = useDispatch();
//   const notes = useSelector((state) => state.notes.notes);

//   React.useEffect(() => {
//     dispatch(fetchNotes());
//   }, [dispatch]);

//   if (!notes.length) {
//     return <p className="text-center text-gray-600 py-4">No notes available</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-semibold text-gray-800 mb-6">Available Notes</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {notes.map((note) => (
//           <div
//             key={note._id}
//             className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
//           >
//             <div className="p-4">
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{note.title}</h3>
//               <p className="text-gray-600 mb-4">Subject: {note.subject.name}</p>
//               <a
//                 href={note.fileUrl}
//                 download
//                 className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//               >
//                 <ArrowDownTrayIcon className="w-6 h-6 mr-2" />
//                 <span>Download</span>
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotesList;

