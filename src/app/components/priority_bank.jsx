"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Tasks from "./tasks";
import { readTasks } from "../../../config/datacalls";

const PriorityBank = () => {
  const [tasks, setTasks] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const updateTasks = (retrievedTasks) => {
      setTasks(retrievedTasks);
    };

    const stopListening = readTasks(updateTasks);
    return () => stopListening();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <div className="p-8 w-full">
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Priority Rankings</h2>
          {isUpdating && (
            <span className="text-sm text-gray-400">
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
                className="space-y-4"
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
                          relative bg-gray-800 rounded-lg shadow-md
                          ${snapshot.isDragging ? "opacity-75" : "opacity-100"}
                          transition-all duration-200
                        `}
                      >
                        {/* Drag Handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-grab active:cursor-grabbing"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-400"
                          >
                            <circle
                              cx="12"
                              cy="7"
                              r="1"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="1"
                            />
                            <circle
                              cx="12"
                              cy="17"
                              r="1"
                            />
                          </svg>
                        </div>

                        <div className="pl-10 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-semibold text-gray-400">
                                #{index + 1}
                              </span>
                              <div className="flex-1">
                                <Tasks data={task} />
                              </div>
                            </div>
                            <div className="text-sm text-gray-400">
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

        <div className="mt-4 p-4 bg-gray-800 rounded">
          <p className="text-sm text-gray-400">
            Total tasks loaded: {tasks.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriorityBank;
