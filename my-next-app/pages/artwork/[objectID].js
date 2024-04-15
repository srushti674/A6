import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetails';

const ArtworkById = () => {
    const router = useRouter();
    const { objectID } = router.query;

    if (!objectID) {
        return null;
    }

    if (typeof objectID !== 'string') {
        return <p>Invalid objectID</p>;
    }

    return (
        <Row>
            <Col>
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    );
}
export default ArtworkById;