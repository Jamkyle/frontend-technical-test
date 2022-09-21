import { Message } from "src/types/message";

interface MessageProps {
  message: Message;
  className?: string;
  author?: string | string[];
}

export default ({ message, className, author }: MessageProps) => {
  return (
    <div className={className}>
      <span>{author}</span>
      <p>{message.body}</p>
    </div>
  );
};
