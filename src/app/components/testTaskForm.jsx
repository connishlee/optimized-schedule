import { useUser } from "@clerk/nextjs";
import { addTasks, readTasks } from "../../../config/datacalls";

export default function TaskForm() {
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const newTask = {
      name: "Sample Task number 3",
      description: "This is a sample task",
      startTime: "10:00",
      endTime: "12:00",
      date: "2024-12-02",
      day: "Sunday",
      userId: user.id,
    };

    try {
      console.log(newTask);
      await addTasks(newTask);
      const finalData = await readTasks();
      console.log("finalData:" + finalData);
      console.log("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return <button onClick={handleSubmit}>Add Task</button>;
}
