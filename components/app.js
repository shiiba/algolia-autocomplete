// TO-DOs
// style the search bar
// add in empty states for search
// make mobile responsive
// abstract html markup to hogan js or handlebars external template?
// test lots of different search edge cases to improve relevance (e.g. laptop, iphone, etc) // synonyms (e.g. coffee maker / coffee machine)
// g-technology brand name stripping
// remove popularity from results after testing
// remove server stuff
// remove debug mode
// deploy to github pages
// then i need to answer the questions jennifer sent over

// Requirements
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import algoliasearch from 'algoliasearch';
import autocomplete from 'autocomplete.js';
import styles from '../sass/styles.scss';

// Algolia options
const client = algoliasearch('QOM7KCRP1J', '50f205da237d825aa0a6e7ab9cb3c571');
const names = client.initIndex('algolia_test');
const autocompleteOptions = { 
        hint: false, 
        autoselect: true, 
        debug: true, 
        templates: { dropdownMenu: '#test-container'} 
      }
const autocompleteSchema = [
  {
    source: autocomplete.sources.hits(names, { hitsPerPage: 7 }),
    name: '0',
    displayKey: 'name',
    templates: {
      header: '<h4>Product</h4>',
      suggestion: (suggestion) => {
        // console.log(suggestion);
        let name = suggestion._highlightResult.name.value;
        // strips brand from name if it exists
        let newName = checkForBrand(suggestion.name, suggestion.brand) ? name.substring(name.indexOf("-") + 2) : name;
        // sets category in order of most specific
        let category = suggestion.categories[2] || suggestion.categories[1] || suggestion.categories[0];
        
        return (
          '<div class="product">' + 
          '  <div class="product-image">' +
          '    <img class="scale-down" src="' + suggestion.image + '"/>' + 
          '  </div>' +
          '  <div class="product-details">' + 
          '    <span class="brand">' + suggestion._highlightResult.brand.value + '</span>' + 
          '    <br/>' +
          '    <span class="name">' + newName + '</span>' + 
          '    <br/>' +
          '    <span class="category">in ' + category + '</span>' +
          '    <br/>' +
          '    <span class="price"> $' + suggestion.price + '     </span>' + 
          '    <span class="popularity"> Popularity: ' + suggestion.popularity + '</span>' +
          '  </div>' + 
          '</div>'
        );
      }
    }
  }
];

// checks brand name if it exists in the name
function checkForBrand(name, brand) {
  return name.indexOf(brand) != -1 ? true : false;
}

class AlgoliaAutocomplete extends React.Component {

  componentDidMount() {
    autocomplete(
      '#search-input', autocompleteOptions, autocompleteSchema)
    .on('autocomplete:selected', (event, suggestion, dataset) => { 
      event.preventDefault();
      window.location.href = suggestion.url;
    });
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
$(() => {
  ReactDOM.render(
    <div>
      <AlgoliaAutocomplete />
    </div>,
    document.getElementById('container')
  );
});
