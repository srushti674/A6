import React, { useState } from "react";
import { useRouter } from "next/router";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { addToHistory } from "@/lib/userData"; 

export default function AdvancedSearch() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = async (data) => {
    let queryString = "searchBy=true";
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    if (data.isOnView) queryString += `&isOnView=${data.isOnView}`;
    if (data.isHighlight) queryString += `&isHighlight=${data.isHighlight}`;
    if (data.q) queryString += `&q=${data.q}`;

    try {
      await addToHistory(queryString);
      setSearchHistory((current) => [...current, queryString]);
      router.push(`/artwork?${queryString}`);
    } catch (error) {
      console.error('Error adding to history:', error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="q"
              {...register("q", { required: true })}
              className={errors.q ? "is-invalid" : ""}
            />
            {errors.q && <p className="text-danger">Search query is required.</p>}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select name="searchBy" className="mb-3" {...register("searchBy")}>
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" placeholder="" name="geoLocation" {...register("geoLocation")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" placeholder="" name="medium" {...register("medium")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            name="isHighlight"
            {...register("isHighlight")}
          />
          <Form.Check
            type="checkbox"
            label="Currently on View"
            name="isOnView"
            {...register("isOnView")}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
