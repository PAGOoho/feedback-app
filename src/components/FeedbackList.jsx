import { motion, AnimatePresence } from 'framer-motion';
import Feedbackitem from './Feedbackitem';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

import Spinner from './shared/Spinner';

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {!feedback || feedback.length === 0
          ? 'No feedback yet!'
          : feedback.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Feedbackitem key={item.id} item={item} />
              </motion.div>
            ))}
      </AnimatePresence>
    </div>
  );
}

export default FeedbackList;
