import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Badge, Card, ListGroupItem, ListGroup, CardGroup } from 'react-bootstrap';

var _ = require('lodash');
/* eslint-disable */

export class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterArray: this.props.filteredArray
        }
        //this.removeFilter = this.removeFilter.bind(this);
        this.OrderFilterArray = this.OrderFilterArray.bind(this);
        this.clearAllFilter = this.clearAllFilter.bind(this);
    }
    removeFilter = (value) => {
        console.log(value);
    }
    OrderFilterArray() {
        this.props.orderByValue(event.target.value);
    }
    clearAllFilter(event) {
        this.props.removeAllFilter(event);
    }
    render() {
        console.log('resultAr', this.props.filteredArray);
        console.log('searchArray', this.props.filterSearch);
        return (
            <Container>
                <Row className="padding-tb">
                    <Col>
                        <h6>Selected Filters</h6>
                    </Col>
                </Row>
                <Row className="padding-tb">
                    {this.props.filterSearch.map(element =>
                        <Col lg={1} key={element.value}>
                            <Badge pill variant="secondary" value={element.value}>{element.value} <span onClick={this.removeFilter}>X</span></Badge>
                        </Col>
                    )}
                </Row>
                <Row className="padding-tb">
                    <Col lg={10}></Col>
                    <Col lg={2}>
                        <select onChange={this.OrderFilterArray}>
                            <option value="0">Sort by ID</option>
                            <option value='asc'>Ascending</option>
                            <option value='desc'>Descending</option>
                        </select>
                    </Col>
                </Row>
                <Row className="search-list">
                    {this.props.filteredArray.map(sp =>
                        <Col key={sp.id} className="padding-5" lg={3} xs={6}>
                            <CardGroup>
                                <Card>
                                    <Card.Img variant="top" src={sp.image} />
                                    <Card.Title>
                                        <h5>{sp.name}</h5>
                                        <span>{sp.created}</span>
                                    </Card.Title>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>
                                            <Row>
                                                <Col className="list-group-label">Status</Col>
                                                <Col className="list-group-text">{sp.status}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col className="list-group-label">Species</Col>
                                                <Col className="list-group-text">{sp.species}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col className="list-group-label">Gender</Col>
                                                <Col className="list-group-text">{sp.gender}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col className="list-group-label">Origin</Col>
                                                <Col className="list-group-text">{sp.origin.name}</Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col lg={4} className="list-group-label">Last Location</Col>
                                                <Col lg={8} className="list-group-text">{sp.location.name}</Col>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </CardGroup>
                        </Col>
                    )}

                </Row>
            </Container>

        )
    }
}