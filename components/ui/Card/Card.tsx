import { memo, useCallback } from 'react';

interface CardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly onClick?: (event: React.MouseEvent) => void;
  readonly onMouseDown?: (event: React.MouseEvent) => void;
  readonly isInteractive?: boolean;
}

function CardComponent({
  children,
  className = '',
  onClick,
  onMouseDown,
  isInteractive = false,
}: CardProps) {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6';
  const interactiveClasses = isInteractive ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : '';
  const combinedClasses = `${baseClasses} ${interactiveClasses} ${className}`.trim();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (isInteractive && onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick(event as unknown as React.MouseEvent);
      }
    },
    [isInteractive, onClick]
  );

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
      onMouseDown={onMouseDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

export const Card = memo(CardComponent);
