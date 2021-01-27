import React ,{Component} from 'react'
import 'typeface-roboto';
import {random} from 'lodash';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import QuoteMachine from './components/quoteMachine';

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex', 
    height: '100vh'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectedQuoteIndex: 0, 
    }
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
    this.selectedQuoteIndex = this.generateNewQuoteIndex.bind(this);
  }
//fetch json and set to apps state 
//new qoute index passed in to setState as a () and not result. Callback takes in ().
  componentDidMount() {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(data => data.json())
      .then(quotes => this.setState({quotes}, this.generateNewQuoteIndex));
  }

//() to render quote at selected index using 'getter' function
// if state quotes has no length OR(||) if number of index is not an interger (returns false to 'isInterger') return undefined
// or return the state(quote and index)
  get selectedQuote() {
    if (!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)) {
      return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex]
  }  
//generate a random quoteIndex between 0 and the length of quotes array -1
//returns undefined if empty
  generateNewQuoteIndex() {
    if (!this.state.quotes.length) {
      return undefined;
    }
    return random(0, this.state.quotes.length -1);
  }
//create  () that selects new random quote to be rendered when button is clicked(clickhandler)
  assignNewQuoteIndex() {
    this.setState({selectedQuoteIndex : this.generateNewQuoteIndex() });
    
  }
  
  render() {
    console.log(this.state.selectedQuoteIndex)
    return (
      <>
      <h1 align="center">Random Quote Machine</h1>
      <h2 align="center">freeCodeCamp</h2>
      <h4 align="center">Front End Libraries Project</h4>
      <Grid className={this.props.classes.container} id="quote-box" justify="center" container>
        <Grid xs={11} lg={8} item>
          {
            this.selectedQuote ? 
            <QuoteMachine selectedQuote={this.selectedQuote} assignNewQuoteIndex={this.assignNewQuoteIndex} />
          :null
          }
        </Grid>
      </Grid>
      </>
    );
  }
}

//withStyles() - pass files into () which returns a higher order component to which we pass in the App component
export default withStyles(styles)(App);
