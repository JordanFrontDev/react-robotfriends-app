import React, {Component} from 'react';
import CardList from '../components/CardList';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundury from './ErrorBoundury';
import { setSearchField, requestRobots } from '../actions';


const mapStateToProps = state => {
    return {
        searchfield: state.searchRobots.searchfield,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}


class App extends Component {
   componentDidMount() {
        this.props.onRequestRobots();
    }

   
    render() {
        const {searchfield, onSearchChange, robots, isPending} = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        
         
        return isPending ?
        <h1>loading</h1> :
        
         (
            <div className="tc">
                <h1 className="f2">Robo friends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundury>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundury>
                </Scroll>
            </div>
        );
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);