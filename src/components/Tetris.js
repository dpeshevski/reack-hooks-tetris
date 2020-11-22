import React, { useState } from 'react';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage } from '../gameHelpers';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();;
    setGameOver(false);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
      }
    }
  };

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score`} />
              <Display text={`rows`} />
              <Display text={`Level`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
