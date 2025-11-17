import clsx from 'clsx';
import {
  AttachmentIcon,
  MicrophoneIcon,
  SendMessageIcon,
  SmileIcon,
} from './icons';
import { useState } from 'react';

const SendMessage = ({ onSend }: { onSend: (msg: string) => void }) => {
  const [selected, setSelected] = useState<
    'ATTACHMENTS' | 'EMOJIS' | '' | 'VOICE_MESSAGE'
  >('');

  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const msgToSend = inputValue.trim();

    onSend(msgToSend);
    setInputValue('');
  };

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      onSend(inputValue);
      setInputValue('');
    }
  };

  return (
    <div
      className={clsx(
        'fixed right-0 bottom-0 h-14 w-[calc(100vw-300px)]',
        'border-t border-t-neutral-100/20 bg-neutral-900/50',
        'flex items-center gap-2 px-4 py-2',
      )}
    >
      <div
        className={clsx(
          'cursor-pointer rounded-sm p-2',
          'border border-transparent',
          selected === 'EMOJIS'
            ? 'border-white/50'
            : 'hover:border-neutral-100/15',
        )}
        onClick={() => setSelected('EMOJIS')}
      >
        <SmileIcon className="text-neutral-300" />
      </div>
      <div
        className={clsx(
          'cursor-pointer rounded-sm p-2',
          'border border-transparent',
          selected === 'ATTACHMENTS'
            ? 'border-white/50'
            : 'hover:border-neutral-100/15',
        )}
        onClick={() => setSelected('ATTACHMENTS')}
      >
        <AttachmentIcon className="text-neutral-300" />
      </div>
      <input
        className="h-full flex-1 px-2 text-neutral-300 placeholder:text-neutral-500 focus:outline-none"
        placeholder="Type a message"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={handleEnterKeyDown}
      />
      <div
        className={clsx(
          'cursor-pointer rounded-sm p-2',
          'border border-transparent',
        )}
        onClick={handleSendMessage}
      >
        <SendMessageIcon className="text-neutral-300 hover:text-blue-400" />
      </div>
      <div
        className={clsx(
          'cursor-pointer rounded-sm p-2',
          'border border-transparent',
          selected === 'ATTACHMENTS'
            ? 'border-white/50'
            : 'hover:border-neutral-100/15',
        )}
        onClick={() => setSelected('VOICE_MESSAGE')}
      >
        <MicrophoneIcon className="text-neutral-300" />
      </div>
    </div>
  );
};

export default SendMessage;
