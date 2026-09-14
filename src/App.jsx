import React, { useState } from "react";
import "./styles.css";

// --- 5 CUSTOMIZABLE GAME ROUNDS ---
const GAME_ROUNDS = [
  // --- ROUND 1 ---
  {
    id: 1,
    title: "Vamp",
    materialRollWidth: '54"',
    options: [
      {
        id: "A",
        label: "Option 1",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/vamp_option_1_chosen.png",
        efficiency: "67.95%",
        isCorrect: true,
        explanation: ""
      },
      {
        id: "B",
        label: "Option 2",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/vamp_option_2.png",
        efficiency: "67.02%",
        isCorrect: false,
        explanation: ""
      },
      {
        id: "C",
        label: "Option 3",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/vamp_option_3.png",
        efficiency: "62.58%",
        isCorrect: false,
        explanation: ""
      }
    ]
  },

  // --- ROUND 2 ---
  {
    id: 2,
    title: "Collar Reinforcement",
    materialRollWidth: "",
    options: [
      {
        id: "A",
        label: "Option 1",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/pattern-modification-example-1-current.png",
        efficiency: "74.64%",
        isCorrect: false,
        explanation: ""
      },
      {
        id: "C",
        label: "Option 2",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/pattern-modification-example-1-optimised.png",
        efficiency: "75.25%",
        isCorrect: true,
        explanation: ""
      }
    ]
  },

  // --- ROUND 3 ---
  {
    id: 3,
    title: "Saddle",
    materialRollWidth: '54"',
    options: [
      {
        id: "A",
        label: "Option 1",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/saddle_option_3.png",
        efficiency: "51.1%",
        isCorrect: false,
        explanation: ""
      },
      {
        id: "B",
        label: "Option 2",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/saddle_option_2.png",
        efficiency: "51.57%",
        isCorrect: false,
        explanation: ""
      },
      {
        id: "C",
        label: "Option 3",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/saddle_option_1_chosen.png",
        efficiency: "55.96%",
        isCorrect: true,
        explanation: ""
      }
    ]
  },

  // --- ROUND 4 ---
  {
    id: 4,
    title: "Toe Cap",
    materialRollWidth: "",
    options: [
      {
        id: "A",
        label: "Option 1",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/pattern-rotation-example-2-optimised.png",
        efficiency: "67.68%",
        isCorrect: true,
        explanation: ""
      },
      {
        id: "C",
        label: "Option 2",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/pattern-rotation-example-2-current.png",
        efficiency: "64.37%",
        isCorrect: false,
        explanation: ""
      }
    ]
  },

  // --- ROUND 5 ---
  {
    id: 5,
    title: "Foxing",
    materialRollWidth: '54"',
    options: [
      {
        id: "A",
        label: "Option 1",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/foxing_option_2.png",
        efficiency: "79.32%",
        isCorrect: false,
        explanation: ""
      },
      {
        id: "B",
        label: "Option 2",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/foxing_option_3.png",
        efficiency: "75.31%",
        isCorrect: false,
        explanation: ""
      },
      {
        id: "C",
        label: "Option 3",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/foxing_option_1_chosen.png",
        efficiency: "81.43%",
        isCorrect: true,
        explanation: ""
      }
    ]
  }
];

export default function App() {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const currentRound = GAME_ROUNDS[currentRoundIndex];
  const selectedOption = currentRound.options.find(
    (opt) => opt.id === selectedOptionId
  );

  const handleSelectOption = (optionId) => {
    setSelectedOptionId(optionId);
    setIsRevealed(true);

    const chosen = currentRound.options.find((opt) => opt.id === optionId);
    if (chosen?.isCorrect && !isRevealed) {
      setScore((prev) => prev + 1);
    }
  };

  const handleTryAgain = () => {
    setSelectedOptionId(null);
    setIsRevealed(false);
  };

  const handleNextRound = () => {
    if (currentRoundIndex < GAME_ROUNDS.length - 1) {
      setCurrentRoundIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsRevealed(false);
    }
  };

  return (
    <div className="app-container">
      <div className="game-header">
        <div className="score-badge">Score: {score}</div>
        <nav className="stepper-container">
          {GAME_ROUNDS.map((round, idx) => {
            const isActive = idx === currentRoundIndex;
            const isCompleted = idx < currentRoundIndex;

            return (
              <div
                key={round.id}
                className={`step-wrapper ${isActive ? "active" : ""} ${
                  isCompleted ? "completed" : ""
                }`}
              >
                <div
                  className={`step-line ${isCompleted ? "completed" : ""}`}
                />
                <div
                  className="step-circle"
                  onClick={() => {
                    setCurrentRoundIndex(idx);
                    setSelectedOptionId(null);
                    setIsRevealed(false);
                  }}
                >
                  {isCompleted ? "✓" : round.id}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      <main className="content-area">
        <div className="round-info">
          <span className="step-badge">
            Round {currentRound.id} of {GAME_ROUNDS.length}
          </span>
          <h2>{currentRound.title}</h2>
          {currentRound.materialRollWidth && (
            <p className="roll-width-label">
              Material Roll Width: <strong>{currentRound.materialRollWidth}</strong>
            </p>
          )}
        </div>

        <div className="options-grid">
          {currentRound.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let cardStatus = "";

            if (isRevealed && isSelected) {
              cardStatus = option.isCorrect ? "correct" : "wrong";
            }

            return (
              <div
                key={option.id}
                className={`option-card ${cardStatus} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleSelectOption(option.id)}
              >
                <div className="card-header">
                  <span className="option-label">{option.label}</span>
                  {isRevealed && isSelected && (
                    <span className="efficiency-tag">
                      Efficiency: {option.efficiency}
                    </span>
                  )}
                </div>

                <div className="image-wrapper">
                  <img src={option.imageUrl} alt={option.label} />
                </div>
              </div>
            );
          })}
        </div>

        {isRevealed && selectedOption && (
          <div
            className={`feedback-panel ${
              selectedOption.isCorrect ? "correct" : "wrong"
            }`}
          >
            <div className="feedback-content">
              <h3>
                {selectedOption.isCorrect
                  ? "Correct, this is the most efficient pattern!"
                  : "Not quite efficient enough"}
              </h3>
              <p className="efficiency-metric">
                {currentRound.materialRollWidth && (
                  <>Material Roll Width: {currentRound.materialRollWidth} | </>
                )}
                Pattern Efficiency: <strong>{selectedOption.efficiency}</strong>
              </p>
              <p className="explanation">{selectedOption.explanation}</p>
            </div>

            <div className="feedback-actions">
              {!selectedOption.isCorrect ? (
                <button className="btn btn-prev" onClick={handleTryAgain}>
                  Try Again
                </button>
              ) : (
                <button
                  className="btn btn-next"
                  onClick={handleNextRound}
                  disabled={currentRoundIndex === GAME_ROUNDS.length - 1}
                >
                  {currentRoundIndex === GAME_ROUNDS.length - 1
                    ? "Game Completed!"
                    : "Next Round"}
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}