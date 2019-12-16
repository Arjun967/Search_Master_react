import React from 'react';
import logo from './logo.svg';
import * as _ from 'lodash';
import './App.css';
import { Container, Row, Col } from 'react-grid-system';
import { FilterComponent } from './components/filter_component'
import { ListComponent } from './components/list_component';
import {Navbar} from 'react-bootstrap';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      status: [],
      species: [],
      origin: [],
      gender: [],
      filteredArray: [],
      filterSearch: []
    };
  }
  componentDidMount() {
    fetch("https://rickandmortyapi.com/api/character/")
      .then(res => res.json())
      .then(
        (result) => {
          let originArray = _.uniqBy(result.results, 'origin').map(items => { return items.origin });
          this.setState({
            isLoaded: true,
            items: result.results,
            filteredArray: result.results,
            status: _.uniqBy(result.results, 'status').map(items => {
              //var data = { selected: false, value: items.status };
              // return data;
              return items.status;
            }),
            species: _.uniqBy(result.results, 'species').map(items => {
              // var data = { selected: false, value: items.species };
              //return data;
              return items.species
            }),
            origin: _.uniqBy(originArray, 'name').map(items => {
              //var data = { selected: false, value: items.name };
              //return data;
              return items.name
            }),
            gender: _.uniqBy(result.results, 'gender').map(items => {
              //var data = { selected: false, value: items.gender };
              //return data;
              return items.gender
            }),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  updatedFilter = (value) => {

    var searchListArray = this.state.items;
    var array = [];
    if (value.species.length > 0) {
      searchListArray = _.filter(searchListArray, function (element) {
        if (value.species.includes(element.species)) {
          return element;
        }
      });
      value.species.map(el => {
        var data = {
          "key": 'species',
          "value": el
        };
        array.push(data);
      })
    }

    if (value.status.length > 0) {
      searchListArray = _.filter(searchListArray, function (element) {
        if (value.status.includes(element.status)) {
          return element;
        }
      });
      value.status.map(el => {
        var data = {
          "key": 'status',
          "value": el
        };
        array.push(data);
      })
    }

    if (value.gender.length > 0) {
      searchListArray = _.filter(searchListArray, function (element) {
        if (value.gender.includes(element.gender)) {
          return element;
        }
      });
      value.gender.map(el => {
        var data = {
          "key": 'gender',
          "value": el
        };
        array.push(data);
      })
    }

    if (value.origin.length > 0) {
      searchListArray = _.filter(searchListArray, function (element) {
        if (value.origin.includes(element.origin.name)) {
          return element;
        }
      });
      value.origin.map(el => {
        var data = {
          "key": 'origin',
          "value": el
        };
        array.push(data);
      })
    }
    //this.setState({});
    this.setState({ filteredArray: searchListArray, filterSearch: array });
  };
  orderByValue = (value) => {
    var filteredArray = this.state.filteredArray;
    if (value != 0)
      filteredArray = _.orderBy(filteredArray, ['id'], [value]);

    this.setState({ filteredArray: filteredArray });
  }
  removeAllFilter=(event)=>{
    var filteredArray = this.state.items;
    this.setState({ filteredArray: filteredArray });
  }
  render() {
    const { error, isLoaded, items } = this.state;

    let Status = this.state.status;
    let species = this.state.species;
    let origin = this.state.origin;
    let gender = this.state.gender;
    let filteredArray = this.state.filteredArray;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
             {' '}
             Rick and Morty Show
             </Navbar.Brand>
          </Navbar>

          <Container>
            <Row>
              <Col lg={2} className="padding-tb">
                <FilterComponent updatedFilter={this.updatedFilter} Status={Status} gender={gender} origin={origin} species={species} ></FilterComponent>
              </Col>
              <Col lg={10}>
                <ListComponent filteredArray={this.state.filteredArray} filterSearch={this.state.filterSearch} orderByValue={this.orderByValue} removeAllFilter={this.removeAllFilter}></ListComponent>
              </Col>
            </Row>
          </Container>
          {/* </header>       */}
        </div>
      );
    }
  }
}

export default App;
