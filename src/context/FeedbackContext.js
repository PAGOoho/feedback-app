import { v4 as uuidv4 } from 'uuid';
import { createContext, useState } from "react";

import FeedbackData from '../data/FeedbackData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete Feedback?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => item.id === id ? {...item, ...updItem} : item));
    setFeedbackEdit({
      item: false,
      edit: false,
    });
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  }

  return <FeedbackContext.Provider value={{
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,
    feedback,
    feedbackEdit,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext;