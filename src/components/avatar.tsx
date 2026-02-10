import clsx from 'clsx';

interface AvatarProps {
  height?: number;
  width?: number;
  size?: number;
  avatarUrl?: string;
  onClick?: () => void
}

const Avatar = ({
  height = 100,
  width = 100,
  size = 10,
  avatarUrl,
  onClick
}: AvatarProps) => {
  return (
    <img
      alt="avatar"
      src={avatarUrl && avatarUrl.trim() || '/avatar.png'}
      height={height}
      width={width}
      onClick={onClick}
      className={clsx(
        'cursor-pointer overflow-hidden rounded-full object-cover',
        `size-${size}`,
      )}
    />
  );
};

export default Avatar;
