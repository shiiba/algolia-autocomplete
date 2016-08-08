const React = require('react');
const ReactDOM = require('react-dom');
const algoliasearch = require('algoliasearch');
const autocomplete = require('autocomplete.js');

class AlgoliaAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  componentDidMount() {

    // here's where the client goes
    const index = client.initIndex('algolia_test');

    const algoliaOptions = {
      source: (query, callback) => {
        index.search(query, { hitsPerPage: 10 }, (error, content) => {
          if(error){
            callback([]);
            return;
          }
          callback(content.hits, content);
        })
      },
      displayKey: 'name',
      templates: {
        suggestion: function(suggestion) {
          // console.log(suggestion);
          return suggestion._highlightResult.name.value;
        }
      }
    }

    autocomplete('#search-input', { hint: true, autoselect: true, debug: true }, [algoliaOptions])
    // .on('autocomplete:opened', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:shown', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:closed', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:updated', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:cursorchanged', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:selected', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:autocompleted', (event, suggestion, dataset) => { console.log(suggestion) })
  }

  render() {
    return(
      <input 
        id="search-input"
        type="text"
      />
    );
  }
}

// Main React Render function
ReactDOM.render(
  <div>
    <AlgoliaAutocomplete />
  </div>,
   document.getElementById('container')
);
