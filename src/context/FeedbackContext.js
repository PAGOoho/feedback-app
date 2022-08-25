import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  });

  useEffect(() => {
    fetchFeedback();
    console.log("PENIS");
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch('/feedback?_sort=id&_order=desc');
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  }

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete Feedback?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });

      fetchFeedback();
    }
  };

  const addFeedback = async (newFeedback) => {
    await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback),
    });

    fetchFeedback();
  };

  const updateFeedback = async (id, updFeedback) => {
    await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updFeedback),
    });
    
    setFeedbackEdit({
      item: false,
      edit: false,
    });
    
    fetchFeedback();
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
    isLoading,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext;