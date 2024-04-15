import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import { Row, Card, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail"; 
import { getFavourites } from "@/lib/userData"; 

function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favourites = await getFavourites();
        setFavouritesList(favourites);
      } catch (error) {
        console.error('Error fetching favourites:', error.message);
      }
    };
    fetchFavourites();
  }, []);

  if (!favouritesList) return null;

  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCardDetail objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                <Card.Text>
                  Try adding some new artwork to the list.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}

export default Favourites;
