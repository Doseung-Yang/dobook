import type { ComponentSize, ComponentVariant } from '@/types';
import { COMPONENT_VARIANTS } from '@/constants';
import { isValidString } from '@/utils/validation';

interface ButtonProps {
  readonly children: React.ReactNode;
  readonly onClick?: () => void;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly size?: ComponentSize;
  readonly variant?: ComponentVariant;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export function Button({
  children,
  onClick,
  type = 'button',
  size = 'medium',
  variant = 'primary',
  disabled = false,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const sizeMap: Record<ComponentSize, string> = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const baseClasses = 'rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizeClasses = sizeMap[size];
  const variantClasses = `${COMPONENT_VARIANTS[variant].bg} ${COMPONENT_VARIANTS[variant].text} ${COMPONENT_VARIANTS[variant].border}`;
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:opacity-75';
  
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={isValidString(ariaLabel) ? ariaLabel : undefined}
    >
      {children}
    </button>
  );
}
