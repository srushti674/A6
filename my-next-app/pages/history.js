import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Button, Card, ListGroup } from "react-bootstrap";
import { searchHistoryAtom } from "../store";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData"; 

function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null;
  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h); 
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();

    try {
      await removeFromHistory(searchHistory[index]);
      setSearchHistory(current => {
        let x = [...current];
        x.splice(index, 1)
        return x;
      });
    } catch (error) {
      console.error('Error removing history:', error.message);
    }
  };

  return (
    <div>
      {parsedHistory.length === 0 && (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            <Card.Text>Try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
      )}
      {parsedHistory.length > 0 && (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              className={styles.historyListItem}
              onClick={(e) => historyClicked(e, index)}
            >
              {Object.keys(historyItem).map((key) => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default History;
