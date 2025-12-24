import React, { useState } from "react";
import { Sidebar } from "../../sidebar/Sidebar";

export const UserScholarshipManagement = () => {
      const [showNotificationsModal, setShowNotificationsModal] = useState(false);
      // Toggle notifications modal
  const toggleNotificationsModal = () => {
    setShowNotificationsModal(!showNotificationsModal);
  };

  return (
    <>
      <div className="w-full flex">
        <Sidebar onToggleNotifications={toggleNotificationsModal} />
        <div className="w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet facere
          eligendi dolore totam ipsum voluptas maiores saepe modi fuga corporis
          omnis minima, nesciunt officiis molestias voluptates iure excepturi
          distinctio rerum.
        </div>
      </div>
    </>
  );
}

