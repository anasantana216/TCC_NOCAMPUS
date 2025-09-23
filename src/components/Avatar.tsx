interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center ${className}`}>
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default Avatar;