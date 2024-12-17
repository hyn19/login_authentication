import { useState, useEffect } from "react";
import './App.css';
import { FaStar } from "react-icons/fa";
import axios from 'axios';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};

function App() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [text, setText] = useState('');
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('/api/ratings');
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleClick = async value => {
    setCurrentValue(value);
    try {
      await axios.post('/api/ratings', { stars: value, text });
      fetchRatings(); // Fetch ratings again to update the list
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div style={styles.container}>
      <h2> Ratings </h2>
      <div style={styles.stars}>
        {Array(5).fill(0).map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          );
        })}
      </div>
      <textarea
        placeholder="What's your experience?"
        style={styles.textarea}
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button
        style={styles.button}
      >
        Submit
      </button>

      <div>
        <h2>Previous Ratings:</h2>
        <ul>
          {ratings.map((rating, index) => (
            <li key={index}>{`${rating.stars} stars - ${rating.text}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }
};

export default App;
