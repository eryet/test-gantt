"use client";

import { Gantt } from "@/components/gantt/gantt";
import { Task } from "@/types/public-types";
import React from "react";

const tasks: Task[] = [
  {
    start: new Date(2020, 1, 1),
    end: new Date(2020, 1, 2),
    name: "Sleep #1",
    id: "Task 0",
    type: "task",
    progress: 0,
    isDisabled: true,
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
  },
  {
    start: new Date(2020, 1, 2),
    end: new Date(2020, 1, 3),
    name: "Sleep #2",
    id: "Task 0",
    type: "task",
    progress: 0,
    isDisabled: true,
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
  },
  {
    start: new Date(2020, 1, 4),
    end: new Date(2020, 1, 5),
    name: "Sleep #3",
    id: "Task 0",
    type: "task",
    progress: 0,
    isDisabled: true,
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
  },
];

export default function Home() {
  return (
    <>
      <div style={{ height: "500px", width: "100%" }}>
        <Gantt
          tasks={tasks}
          barBackgroundColor={"#CBD5E0"}
        />
      </div>
    </>
  );
}
