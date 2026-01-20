'use client';

import { memo, useEffect, useState, useRef, useMemo } from 'react';

export type CatFeedbackType = 'correct' | 'wrong' | null;

interface CatFeedbackProps {
  readonly type: 'correct' | 'wrong';
  readonly message?: string;
  readonly onClose?: () => void;
  readonly duration?: number;
}

const CORRECT_MESSAGES = ['정답이에요! 🎉', '완벽해요! ✨', '잘했어요! 👏', '대단해요! 🌟'] as const;
const WRONG_MESSAGES = ['아쉬워요 🥲', '다시 생각해볼까요? 🤔', '조금만 더! 💪', '오답이에요 ! 💪'] as const;

const DEFAULT_DURATION = 2000;

function getRandomMessage(messages: readonly string[]): string {
  return messages[Math.floor(Math.random() * messages.length)] || messages[0] || '';
}

interface CuteCatSVGProps {
  readonly type: 'correct' | 'wrong';
}

const CuteCatSVG = memo(function CuteCatSVG({ type }: CuteCatSVGProps) {
  const isCorrect = type === 'correct';
  const bodyColor = isCorrect ? 'var(--cat-orange)' : 'var(--cat-red)';
  
  return (
    <svg
      className="cute-cat-svg"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      data-type={type}
    >
      <ellipse cx="100" cy="120" rx="70" ry="50" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" />
      <ellipse cx="100" cy="125" rx="45" ry="35" fill="var(--cat-white)" />
      <circle cx="100" cy="70" r="50" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" />
      
      <path d="M 70 40 L 85 20 L 100 40 Z" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" />
      <path d="M 75 35 L 88 22 L 95 35 Z" fill="var(--cat-white)" />
      <path d="M 100 40 L 115 20 L 130 40 Z" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" />
      <path d="M 105 35 L 112 22 L 125 35 Z" fill="var(--cat-white)" />
      
      {isCorrect ? (
        <>
          <ellipse cx="85" cy="65" rx="8" ry="12" fill="var(--cat-black)" />
          <ellipse cx="85" cy="62" rx="4" ry="6" fill="var(--cat-white)" />
          <ellipse cx="115" cy="65" rx="8" ry="12" fill="var(--cat-black)" />
          <ellipse cx="115" cy="62" rx="4" ry="6" fill="var(--cat-white)" />
        </>
      ) : (
        <>
          <line x1="78" y1="65" x2="92" y2="65" stroke="var(--cat-black)" strokeWidth="3" strokeLinecap="round" />
          <line x1="108" y1="65" x2="122" y2="65" stroke="var(--cat-black)" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      
      <ellipse cx="100" cy="75" rx="5" ry="4" fill="var(--cat-black)" />
      
      {isCorrect ? (
        <path d="M 100 80 Q 90 85 85 80" fill="none" stroke="var(--cat-black)" strokeWidth="3" strokeLinecap="round" />
      ) : (
        <path d="M 85 80 Q 100 75 115 80" fill="none" stroke="var(--cat-black)" strokeWidth="3" strokeLinecap="round" />
      )}
      
      <ellipse cx="60" cy="90" rx="15" ry="20" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" transform="rotate(-20 60 90)" />
      <ellipse cx="60" cy="90" rx="8" ry="12" fill="var(--cat-white)" transform="rotate(-20 60 90)" />
      <ellipse cx="55" cy="95" rx="3" ry="4" fill="var(--cat-pink)" />
      <ellipse cx="140" cy="90" rx="15" ry="20" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" transform="rotate(20 140 90)" />
      <ellipse cx="140" cy="90" rx="8" ry="12" fill="var(--cat-white)" transform="rotate(20 140 90)" />
      <ellipse cx="145" cy="95" rx="3" ry="4" fill="var(--cat-pink)" />
      <ellipse cx="70" cy="150" rx="12" ry="18" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" transform="rotate(15 70 150)" />
      <ellipse cx="68" cy="155" rx="2" ry="3" fill="var(--cat-pink)" />
      <ellipse cx="130" cy="150" rx="12" ry="18" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" transform="rotate(-15 130 150)" />
      <ellipse cx="132" cy="155" rx="2" ry="3" fill="var(--cat-pink)" />
      <path d="M 30 130 Q 20 100 40 90 Q 50 85 60 95" fill={bodyColor} stroke="var(--cat-black)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      
      {isCorrect && (
        <>
          <path d="M 60 100 Q 100 110 140 100" fill="none" stroke="var(--cat-orange-dark)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 65 115 Q 100 125 135 115" fill="none" stroke="var(--cat-orange-dark)" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
});

function CatFeedbackComponent({ type, message, onClose, duration = DEFAULT_DURATION }: CatFeedbackProps) {
  const [isHiding, setIsHiding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const displayMessage = useMemo(() => {
    return message || getRandomMessage(type === 'correct' ? CORRECT_MESSAGES : WRONG_MESSAGES);
  }, [message, type]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setIsHiding(false);

    timerRef.current = setTimeout(() => {
      setIsHiding(true);
      closeTimerRef.current = setTimeout(() => {
        onCloseRef.current?.();
      }, 300);
    }, duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [type, duration]);

  if (isHiding) {
    return null;
  }

  return (
    <>
      <div className="cat-feedback-overlay gpu-accelerated" data-type={type} data-visible={!isHiding} />
      <div
        className="cat-feedback-container gpu-accelerated"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-visible={!isHiding}
      >
        <div className="cat-feedback-content gpu-accelerated" data-type={type}>
          <div className="cat-svg-wrapper gpu-accelerated">
            <CuteCatSVG type={type} />
            {type === 'correct' && (
              <div className="cat-sparkles gpu-accelerated">
                <span>✨</span>
                <span>✨</span>
                <span>✨</span>
              </div>
            )}
          </div>
          <p className="cat-message gpu-accelerated">{displayMessage}</p>
        </div>
      </div>
    </>
  );
}

export const CatFeedback = memo(CatFeedbackComponent);
