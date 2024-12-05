"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Tasks from "./tasks";
import { readTasks, updateTaskPriorities } from "../../../config/datacalls";
import { GripVertical } from "lucide-react";

const PriorityBank = () => {
  const [tasks, setTasks] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const updateTasks = (retrievedTasks) => {
      const activeTasks = retrievedTasks
        .filter((task) => !task.isCompleted)
        .sort((a, b) => (a.priority || 0) - (b.priority || 0));
      setTasks(activeTasks);
    };

    const stopListening = readTasks(updateTasks);
    return () => stopListening();
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
    setIsUpdating(true);

    try {
      const priorityUpdates = reorderedTasks.map((task, index) => ({
        taskId: task.id,
        priority: index,
      }));

      await updateTaskPriorities(priorityUpdates);
    } catch (error) {
      console.error("Error updating priorities:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getTagColor = (tag) => {
    if (!tag) return "bg-gray-100 text-gray-800";

    switch (tag.toString().toLowerCase()) {
      case "personal":
        return "bg-blue-100 text-blue-800";
      case "work":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 w-full mt-16">
      <div className="bg-white rounded-lg p-6 shadow-sm h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Priority Rankings
          </h2>
          {isUpdating && (
            <span className="text-sm text-gray-500">
              Updating priorities...
            </span>
          )}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="priority-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex-1 overflow-y-auto pr-4 space-y-3 min-h-0"
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`
                          relative bg-white rounded-lg border border-gray-200
                          ${snapshot.isDragging ? "shadow-lg" : "shadow-sm"}
                          transition-all duration-200
                        `}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-grab active:cursor-grabbing"
                        >
                          <GripVertical className="text-gray-400 w-4 h-4" />
                        </div>

                        <div className="pl-10 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-medium text-gray-400">
                                #{index + 1}
                              </span>
                              <div className="flex-1 space-y-2">
                                <Tasks data={task} />
                                <div className="flex gap-2">
                                  {task.tag && (
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(
                                        task.tag
                                      )}`}
                                    >
                                      {task.tag}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {task.day}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            Total active tasks: {tasks.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriorityBank;
