import React from 'react';

interface AvatarProps {
  username: string;
  photo?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ 
  username = '', 
  photo, 
  size = 'md', 
  className = '',
  onClick 
}) => {
  // Size configurations
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  };

  // Generate consistent color based on username
  const generateColor = (name: string) => {
    if (!name || typeof name !== 'string') return 'from-[#4555EA] to-[#8938EA]'; // <-- Guard clause
    const colors = [
      'from-[#8938EA] to-[#4555EA]',
      'from-[#4555EA] to-[#8938EA]',
      'from-[#8938EA] to-[#3644D8]',
      'from-[#9D4EDD] to-[#4555EA]',
      'from-[#8938EA] to-[#2D3FCC]',
      'from-[#4555EA] to-[#7C3AED]',
      'from-[#8938EA] to-purple-600',
      'from-[#4555EA] to-violet-600',
      'from-[#8938EA] to-indigo-600',
      'from-[#4555EA] to-blue-600',
      'from-[#8938EA] to-[#5B21B6]',
      'from-[#4555EA] to-[#6366F1]',
      'from-[#8938EA] to-[#1E1B4B]',
      'from-[#4555EA] to-[#312E81]',
      'from-[#8938EA] to-slate-700',
      'from-[#4555EA] to-gray-700'
    ];
    
    // Create a simple hash from username
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      const char = name.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Get initials from username
  const getInitials = (name: string) => {
    if (!name) return '?';
    
    // Remove @ if present and split by common separators
    const cleanName = name.replace('@', '');
    const parts = cleanName.split(/[\s._-]+/);
    
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    
    return cleanName.charAt(0).toUpperCase();
  };

  const baseClasses = `
    ${sizeClasses[size]} 
    rounded-full 
    flex 
    items-center 
    justify-center 
    font-semibold 
    text-white 
    flex-shrink-0
    transition-all 
    duration-200
    ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''}
    ${className}
  `;

  if (photo) {
    return (
      <img
        src={photo}
        alt={username}
        onClick={onClick}
        className={`${baseClasses} object-cover ${onClick ? 'hover:ring-2 hover:ring-purple-300' : ''}`}
        onError={(e) => {
          // Fallback to generated avatar if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.className = `${baseClasses} bg-gradient-to-br ${generateColor(username)}`;
            fallback.textContent = getInitials(username);
            fallback.onclick = onClick || null;
            parent.appendChild(fallback);
          }
        }}
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} bg-gradient-to-br ${generateColor(username)} shadow-md`}
    >
      {getInitials(username)}
    </div>
  );
};

export default Avatar;