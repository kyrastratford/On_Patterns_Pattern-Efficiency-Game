import React, { useState } from "react";
import "./styles.css";

const GAME_ROUNDS = [
  {
    id: 1,
    title: "Vamp",
    materialRollWidth: '52"',
    options: [
      {
        id: "A",
        label: "Option 1",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/vamp-option-1.png",
        efficiency: "67.95%",
        isCorrect: true,
        explanation: "Linear alignment creates wide vertical gaps, causing excessive waste along the roll edges."
      },
      {
        id: "B",
        label: "Option 2",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/vamp-option-2.png",
        efficiency: "67.02%",
        isCorrect: false,
        explanation: "Parallel staggering improves density, but leaves un-nested dead space across the 52\" width."
      },
      {
        id: "C",
        label: "Option 3",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/vamp-option-3.png",
        efficiency: "62.58%",
        isCorrect: false,
        explanation: "Interlocking curvature tessellates upper shapes tightly, maximizing 52\" width efficiency and cutting scrap under 14%."
      }
    ]
  },
  ...Array.from({ length: 9 }, (_, index) => ({
    id: index + 2,
    title: `Pattern Nesting Challenge - Round ${index + 2}`,
    materialRollWidth: '54"',
    options: [
      {
        id: "A",
        label: "Option 1",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/strobel-step-1.gif",
        efficiency: "74.10%",
        isCorrect: false,
        explanation: "Unoptimized angle produces excess margin along cut edges."
      },
      {
        id: "B",
        label: "Option 2",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/strobel-step-2.gif",
        efficiency: "88.90%",
        isCorrect: true,
        explanation: "Tessellated rotation fills all geometric voids along the material length."
      },
      {
        id: "C",
        label: "Option 3",
        imageUrl: "https://raw.githubusercontent.com/kyrastratford/On_3D-Assets/main/strobel-step-3.gif",
        efficiency: "80.25%",
        isCorrect: false,
        explanation: "Leaves oversized gaps between heel and toe curves."
      }
    ]
  }))
];

export default function App() {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const currentRound = GAME_ROUNDS[currentRoundIndex];
  const selectedOption = currentRound.options.find((opt) => opt.id === selectedOptionId);

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
                <div className={`step-line ${isCompleted ? "completed" : ""}`} />
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
          <p className="roll-width-label">
            Material Roll Width: <strong>{currentRound.materialRollWidth}</strong>
          </p>
        </div>

        <div className="options-grid">
          {currentRound.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let cardStatus = "";

            // Only highlight the option the user actually clicked
            if (isRevealed && isSelected) {
              cardStatus = option.isCorrect ? "correct" : "wrong";
            }

            return (
              <div
                key={option.id}
                className={`option-card ${cardStatus} ${isSelected ? "selected" : ""}`}
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
          <div className={`feedback-panel ${selectedOption.isCorrect ? "correct" : "wrong"}`}>
            <div className="feedback-content">
              <h3>
                {selectedOption.isCorrect
                  ? "Correct Nesting Strategy!"
                  : "Not Quite Efficient Enough"}
              </h3>
              <p className="efficiency-metric">
                Material Roll Width: {currentRound.materialRollWidth} | Pattern Efficiency:{" "}
                <strong>{selectedOption.efficiency}</strong>
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