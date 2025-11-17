import Avatar from './avatar';
import clsx from 'clsx';
import { CloseIcon, SearchIcon } from './icons';
import { useState } from 'react';
import SearchBar from './search-bar';
import { motion } from 'motion/react';

const UserDetail = () => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        'fixed top-16 left-[300px] flex h-12 w-[calc(100vw-300px)] items-center justify-between px-4 py-8',
        'border-b border-b-neutral-100/20 bg-neutral-900/50 backdrop-blur-md',
        'flex items-center justify-between',
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar />
        <h1 className="text-md font-semibold text-neutral-300">Raj Mane</h1>
      </div>

      <SearchIcon
        classname="cursor-pointer"
        motionprops={{
          initial: false,
          whileTap: { scale: [0.6, 1] },
          transition: { duration: 0.3 },
        }}
        onClick={() => setSearchOpen(!searchOpen)}
      />

      {searchOpen && (
        <motion.div
          initial={{
            y: -10,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          // TODO: Add closing animations
          className="absolute right-0 -bottom-14 flex h-10 w-[350px] items-center rounded-md bg-neutral-900/75 px-4 py-6"
        >
          <div className="flex w-full items-center gap-4">
            <SearchBar />
            <CloseIcon
              classname="cursor-pointer text-neutral-500 hover:text-neutral-200"
              onClick={() => setSearchOpen(false)}
              motionprops={{
                initial: { rotate: 0, scale: 1 },
                whileHover: { rotate: 60, scale: 1.2 },
                transition: { duration: 0.3 },
              }}
            />
          </div>
        </motion.div>
      )}

      {/* TODO: Implement a feature where you can add search something and find that chat */}
    </div>
  );
};

export default UserDetail;
