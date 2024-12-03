// "use client";
// import { useState } from "react";
// import {
//   updateTask,
//   deleteTask,
//   markTaskCompleted,
// } from "../../../config/datacalls";

// function formatTime(time) {
//   const [hours, minutes] = time.split(":");
//   const amPm = parseInt(hours) >= 12 ? "PM" : "AM";
//   const formattedHours = parseInt(hours) % 12 || 12;
//   return `${formattedHours}:${minutes} ${amPm}`;
// }

// export default function Tasks({ data }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedTask, setEditedTask] = useState({
//     name: data.name,
//     description: data.description,
//     startTime: data.startTime,
//     endTime: data.endTime,
//   });

//   const handleUpdate = async () => {
//     try {
//       const result = await updateTask(data.id, {
//         name: editedTask.name,
//         description: editedTask.description,
//         startTime: editedTask.startTime,
//         endTime: editedTask.endTime,
//       });

//       if (result) {
//         setIsEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const result = await deleteTask(data.id);
//       if (!result) {
//         console.error("Failed to delete task");
//       }
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleComplete = async () => {
//     try {
//       const result = await markTaskCompleted(data.id);
//       if (!result) {
//         console.error("Failed to mark task as completed");
//       }
//     } catch (error) {
//       console.error("Error marking task as completed:", error);
//     }
//   };

//   return (
//     <div
//       className={`
//         p-6 rounded-lg transition-all duration-300 
//         ${
//           data.isCompleted
//             ? "opacity-50 line-through bg-gray-800"
//             : "bg-gray-800"
//         }
//       `}
//     >
//       {isEditing ? (
//         <div className="space-y-4">
//           <input
//             type="text"
//             value={editedTask.name}
//             onChange={(e) =>
//               setEditedTask({ ...editedTask, name: e.target.value })
//             }
//             className="w-full p-2 bg-gray-700 rounded text-white"
//             placeholder="Task Name"
//           />
//           <textarea
//             value={editedTask.description}
//             onChange={(e) =>
//               setEditedTask({ ...editedTask, description: e.target.value })
//             }
//             className="w-full p-2 bg-gray-700 rounded text-white"
//             placeholder="Description"
//           />
//           <div className="flex space-x-2">
//             <input
//               type="time"
//               value={editedTask.startTime}
//               onChange={(e) =>
//                 setEditedTask({ ...editedTask, startTime: e.target.value })
//               }
//               className="p-2 bg-gray-700 rounded text-white"
//             />
//             <input
//               type="time"
//               value={editedTask.endTime}
//               onChange={(e) =>
//                 setEditedTask({ ...editedTask, endTime: e.target.value })
//               }
//               className="p-2 bg-gray-700 rounded text-white"
//             />
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleUpdate}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => setIsEditing(false)}
//               className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-xl font-semibold">{data.name}</h3>
//               <p className="text-gray-400 mt-2">{data.description}</p>
//               <div className="mt-2 text-sm text-gray-500">
//                 {formatTime(data.startTime)} - {formatTime(data.endTime)}
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="text-blue-400 hover:text-blue-300"
//                 title="Edit Task"
//               >
//                 ✏️
//               </button>
//               <button
//                 onClick={handleComplete}
//                 className="text-green-400 hover:text-green-300"
//                 title="Mark Complete"
//               >
//                 ✓
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="text-red-400 hover:text-red-300"
//                 title="Delete Task"
//               >
//                 🗑️
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import {
  updateTask,
  deleteTask,
  markTaskCompleted,
} from "../../../config/datacalls";

function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const amPm = parseInt(hours) >= 12 ? "PM" : "AM";
  const formattedHours = parseInt(hours) % 12 || 12;
  return `${formattedHours}:${minutes} ${amPm}`;
}

export default function Tasks({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: data.name,
    description: data.description,
    startTime: data.startTime,
    endTime: data.endTime,
  });

  const handleUpdate = async () => {
    try {
      const result = await updateTask(data.id, {
        name: editedTask.name,
        description: editedTask.description,
        startTime: editedTask.startTime,
        endTime: editedTask.endTime,
      });

      if (result) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteTask(data.id);
      if (!result) {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleComplete = async () => {
    try {
      // Pass the opposite of current completion status to toggle it
      const result = await markTaskCompleted(data.id, !data.isCompleted);
      if (!result) {
        console.error("Failed to toggle task completion status");
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  return (
    <div
      className={`
        p-6 rounded-lg transition-all duration-300 
        ${data.isCompleted ? "opacity-50 bg-gray-800" : "bg-gray-800"}
      `}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) =>
              setEditedTask({ ...editedTask, name: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded text-white"
            placeholder="Task Name"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded text-white"
            placeholder="Description"
          />
          <div className="flex space-x-2">
            <input
              type="time"
              value={editedTask.startTime}
              onChange={(e) =>
                setEditedTask({ ...editedTask, startTime: e.target.value })
              }
              className="p-2 bg-gray-700 rounded text-white"
            />
            <input
              type="time"
              value={editedTask.endTime}
              onChange={(e) =>
                setEditedTask({ ...editedTask, endTime: e.target.value })
              }
              className="p-2 bg-gray-700 rounded text-white"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-xl font-semibold ${data.isCompleted ? "line-through" : ""}`}>
                {data.name}
              </h3>
              <p className={`text-gray-400 mt-2 ${data.isCompleted ? "line-through" : ""}`}>
                {data.description}
              </p>
              <div className="mt-2 text-sm text-gray-500">
                {formatTime(data.startTime)} - {formatTime(data.endTime)}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-400 hover:text-blue-300"
                title="Edit Task"
              >
                ✏️
              </button>
              <button
                onClick={handleComplete}
                className={`${
                  data.isCompleted ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300"
                }`}
                title={data.isCompleted ? "Mark Incomplete" : "Mark Complete"}
              >
                {data.isCompleted ? "↩️" : "✓"}
              </button>
              <button
                onClick={handleDelete}
                className="text-red-400 hover:text-red-300"
                title="Delete Task"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}