import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./chat.module.css";

type Thread = {
  id: string;
  title: string;
};

const Sidebar = ({ onSelectThread }: { onSelectThread: (id: string) => void }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  // Load threads from cookies when component mounts
  useEffect(() => {
    const savedThreads = Cookies.get("threads");
    if (savedThreads) {
      setThreads(JSON.parse(savedThreads));
    }
  }, []);

  // Save threads to cookies whenever the `threads` state changes
  useEffect(() => {
    Cookies.set("threads", JSON.stringify(threads));
  }, [threads]);

  // Add a new thread
  const handleAddThread = () => {
    const newThreadTitle = prompt("Enter a title for the new thread:");
    if (newThreadTitle) {
      const newThread = {
        id: Date.now().toString(), // Unique ID based on current timestamp
        title: newThreadTitle,
      };
      setThreads((prevThreads) => [...prevThreads, newThread]);
    }
  };

  // Delete a thread
  const handleDeleteThread = (id: string) => {
    const updatedThreads = threads.filter((thread) => thread.id !== id);
    setThreads(updatedThreads);
  };

  // Select a thread to continue chatting
  const handleThreadClick = (id: string) => {
    onSelectThread(id);
  };

  return (
    <div className={styles.sidebar}>
      <h2>Past Threads</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <span onClick={() => handleThreadClick(thread.id)}>{thread.title}</span>
            <button onClick={() => handleDeleteThread(thread.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddThread} className={styles.addButton}>Add New Thread</button>
    </div>
  );
};

export default Sidebar;
