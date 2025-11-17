import clsx from 'clsx';
import { useState } from 'react';
import { SearchIcon } from './icons';

const SearchBar = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className="relative overflow-hidden rounded-md">
      <input
        className={clsx(
          'h-8 w-full cursor-pointer rounded-md border-1 border-neutral-100/15 py-1 pl-10',
          'placeholder:text-neutral-500 text-neutral-300',
          'focus:ring-1 focus:ring-white/50 outline-none',
        )}
        type="text"
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        placeholder="Search"
      />
      <div className='absolute bottom-0 h-px inset-x-0 bg-purple-600'></div>
      <SearchIcon classname="absolute top-1 left-2" />
    </div>
  );
};

export default SearchBar;
