// TO-DOs
// add in search icon using fontello
// add search IN category
// make mobile responsive

// test lots of different search edge cases to improve relevance (e.g. laptop, iphone, etc) // synonyms (e.g. coffee maker / coffee machine)
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
import productTemplate from '../public/product.handlebars';

// Algolia options
  const client = algoliasearch('QOM7KCRP1J', '50f205da237d825aa0a6e7ab9cb3c571');
  const names = client.initIndex('algolia_test');
  const autocompleteOptions = { 
          hint: false, 
          autoselect: true, 
          debug: true, 
          templates: { 
            dropdownMenu: '#test-container',
            empty: '<div class="empty">No results found.</div>'
          }
        };
  const autocompleteSchema = [
    {
      source: autocomplete.sources.hits(names, { hitsPerPage: 6 }),
      name: '0',
      displayKey: 'name',
      templates: {
        header: (suggestion, answer) => {
          return('<div class="nb-hits">' + answer.nbHits + ' results found</h4>');
        },
        suggestion: (suggestion, answer) => {
          console.log(suggestion);

          let name = suggestion._highlightResult.name.value;
          // strips brand from name if it exists
          let newName = checkForBrand(suggestion.name, suggestion.brand) ? stripBrandFromName(name, suggestion.brand) : name;
          // sets category in order of most specific (one level down)
          let category = suggestion.categories[1] || suggestion.categories[0];
          let data = {
            name: name,
            newName: newName,
            category: category,
            suggestion: suggestion
          }
          return (
            productTemplate(data)
          );
        }
      }
    }
  ];

  // checks if brand name exists in the product name
  function checkForBrand(name, brand) {
    return name.indexOf(brand) != -1 ? true : false;
  }
  // checks if brand name has a hyphen (e.g. G-Technology)
  function containsHyphen(brand) {
    return brand.indexOf('-') != -1 ? true : false;
  }
  // strips brand from name, removing full name
  function stripBrandFromName(name, brand) {
    if (containsHyphen(brand)) {
      return name.split('-').slice(2).join('');
    } else {
      return name.substring(name.indexOf("-") + 2);
    }
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
          <header>Algolia Autocomplete</header>
          <div className="main-message">Search for a product by name and/or brand</div>
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
