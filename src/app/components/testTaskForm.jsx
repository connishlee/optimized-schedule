import { useUser } from "@clerk/nextjs";
import { addTasks } from "../../../config/datacalls";

export default function TaskForm() {
  const { user } = useUser(); // Fetch user info client-side

  const handleSubmit = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const newTask = {
      name: "Sample Task",
      description: "This is a sample task",
      startTime: "10:00",
      endTime: "12:00",
      date: "2024-12-02",
      day: "Monday",
      userId: user.id, // Pass userId
    };

    try {
      console.log(newTask);
      await addTasks(newTask);
      console.log("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return <button onClick={handleSubmit}>Add Task</button>;
}
