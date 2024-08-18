// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const SelectionForm = ({ onSubjectSelect }) => {
//   const [courses, setCourses] = useState([]);
//   const [branches, setBranches] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [selectedBranch, setSelectedBranch] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [selectedSubject, setSelectedSubject] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:4000/api/courses') // Adjust the URL if needed
//       .then(response => setCourses(response.data))
//       .catch(error => console.error('Error fetching courses:', error));
//   }, []);

//   useEffect(() => {
//     if (selectedCourse) {
//       axios.get(`http://localhost:4000/api/branches?course=${selectedCourse}`)
//         .then(response => setBranches(response.data))
//         .catch(error => console.error('Error fetching branches:', error));
//     }
//   }, [selectedCourse]);

//   useEffect(() => {
//     if (selectedBranch) {
//       axios.get(`http://localhost:4000/api/semesters?branch=${selectedBranch}`)
//         .then(response => setSemesters(response.data))
//         .catch(error => console.error('Error fetching semesters:', error));
//     }
//   }, [selectedBranch]);

//   useEffect(() => {
//     if (selectedSemester) {
//       axios.get(`http://localhost:4000/api/subjects?semester=${selectedSemester}`)
//         .then(response => setSubjects(response.data))
//         .catch(error => console.error('Error fetching subjects:', error));
//     }
//   }, [selectedSemester]);

//   const handleSubmit = () => {
//     if (selectedSubject) {
//       onSubjectSelect(selectedSubject);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Select Course, Branch, Semester, and Subject</h2>
//       <div className="space-y-4">
//         <select
//           value={selectedCourse}
//           onChange={(e) => setSelectedCourse(e.target.value)}
//           className="p-2 border rounded"
//         >
//           <option value="">Select Course</option>
//           {courses.map(course => (
//             <option key={course._id} value={course._id}>{course.name}</option>
//           ))}
//         </select>
//         <select
//           value={selectedBranch}
//           onChange={(e) => setSelectedBranch(e.target.value)}
//           className="p-2 border rounded"
//           disabled={!selectedCourse}
//         >
//           <option value="">Select Branch</option>
//           {branches.map(branch => (
//             <option key={branch._id} value={branch._id}>{branch.name}</option>
//           ))}
//         </select>
//         <select
//           value={selectedSemester}
//           onChange={(e) => setSelectedSemester(e.target.value)}
//           className="p-2 border rounded"
//           disabled={!selectedBranch}
//         >
//           <option value="">Select Semester</option>
//           {semesters.map(semester => (
//             <option key={semester._id} value={semester._id}>{semester.number}</option>
//           ))}
//         </select>
//         <select
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//           className="p-2 border rounded"
//           disabled={!selectedSemester}
//         >
//           <option value="">Select Subject</option>
//           {subjects.map(subject => (
//             <option key={subject._id} value={subject._id}>{subject.name}</option>
//           ))}
//         </select>
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-500 text-white p-2 rounded mt-4"
//           disabled={!selectedSubject}
//         >
//           Show Notes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SelectionForm;
