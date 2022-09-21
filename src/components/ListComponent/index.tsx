import { Conversation } from "types/conversation";
import styles from "src/styles/Conversation.module.css";
import ListItem from "../ListItem";

interface PropsList {
  items: Conversation[];
}

export default ({ items }: PropsList) => {
  return (
    <div className={styles.container}>
      {items?.map((conversation: Conversation) => (
        <ListItem key={`conversation-${conversation.id}`} {...conversation} />
      ))}
    </div>
  );
};
