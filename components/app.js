// then, i need to make sure that the info is being returned and rendered in the template correctly
// then i need to style the fuck out of it

// abstract html markup to hogan js or handlebars external template
// maybe then display the selected item on small react class at the bottom
// then i need to answer the questions she sent over

const React = require('react');
const ReactDOM = require('react-dom');
const algoliasearch = require('algoliasearch');
const autocomplete = require('autocomplete.js');
const styles = require('../sass/styles.scss');

class AlgoliaAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    // here's where the Algolia Keys go
    // const client = algoliasearch('YourApplicationID', 'YourSearchOnlyAPIKey');
    
    const names = client.initIndex('algolia_test');
    const categories = client.initIndex('categories');

    const algoliaOptions = [
      {
        source: autocomplete.sources.hits(names, { hitsPerPage: 7 }),
        name: '0',
        displayKey: 'name',
        templates: {
          header: '<h4>Product</h4>',
          suggestion: (suggestion) => {
            console.log(suggestion);
            let name = suggestion._highlightResult.name.value;
            let newName = name.substring(name.indexOf("-") + 2);
            // console.log(newName);
            return (
              '<div class="product">' + '<img src="' + suggestion.image + '"/>' + '<div class="product-name">' + '<div class="brand">' + suggestion._highlightResult.brand.value + '</div>' + '<div class="name">' + newName + '</div>' + '</div>' + '<span class="price"> $' + suggestion.price + '</span>' + '<span class="category"> in ' + suggestion.categories[0] + '</span>' +'</div>'
            );
          }
        }
      },
      {
        source: autocomplete.sources.hits(categories, { hitsPerPage: 3 }),
        name: '1',
        displayKey: 'categories',
        templates: {
          header: '<h4>Categories</h4>',
          // suggestion: this.grabSuggestions(suggestion)
          suggestion: (suggestion) => {
            // console.log(suggestion);
            // return suggestion._highlightResult.categories[0].value;  // need to iterate through top 3 categories
            // return templateCategory.render(suggestion);
          }
        }
      }];

    autocomplete('#search-input', { hint: true, autoselect: true, debug: true, templates: {
        dropdownMenu: '#test-container',
        // footer: '<div class="branding">Powered by <img src="https://www.algolia.com/assets/algolia128x40.png" /></div>'
      } }, algoliaOptions)
    .on('autocomplete:selected', (event, suggestion, dataset) => { console.log(suggestion) })
  }

  render() {
    return(
      <div>
        <input 
          id="search-input"
          type="text"
        />
      </div>
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

///////////
// EXTRA //
///////////

    // .on('autocomplete:opened', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:shown', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:closed', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:updated', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:cursorchanged', (event, suggestion, dataset) => { console.log(suggestion) })
    // .on('autocomplete:autocompleted', (event, suggestion, dataset) => { console.log(suggestion) })

