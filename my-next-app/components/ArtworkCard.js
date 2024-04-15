import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error'; 

const ArtworkCard = ({ objectID }) => {
  const router = useRouter();
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) {
    return <Error statusCode={404} />; 
  }

  if (!data) {
    return null;
  }

  const imageUrl = data.primaryImageSmall || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]";

  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          Object Date: {data.objectDate || "N/A"}<br />
          Classification: {data.classification || "N/A"}<br />
          Medium: {data.medium || "N/A"}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">ID: {objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
