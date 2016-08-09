
// then i need to style the fuck out of it
// abstract html markup to hogan js or handlebars external template
// maybe then display the selected item on small react class at the bottom
// then i need to answer the questions she sent over

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
const categories = client.initIndex('categories');
const autocompleteOptions = { 
        hint: true, 
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
        let newName = name.substring(name.indexOf("-") + 2);
        return (
          '<div class="products">' + 
          '  <img src="' + suggestion.image + '"/>' + 
          '  <div class="product-name">' + 
          '    <div class="brand">' + suggestion._highlightResult.brand.value + '</div>' + 
          '    <div class="name">' + newName + '</div>' + 
          '  </div>' + 
          '  <span class="price"> $' + suggestion.price + '</span>' + 
          '  <span class="product-category"> in ' + suggestion.categories[0] + '</span>' +
          '  <span class="popularity">' + suggestion.popularity + '</span>' +
          '</div>'
        );
      }
    }
  }];


class AlgoliaAutocomplete extends React.Component {

  componentDidMount() {
    autocomplete(
      '#search-input', autocompleteOptions, autocompleteSchema)
    .on('autocomplete:selected', (event, suggestion, dataset) => { 
      // event.preventDefault();
      // window.location.href = suggestion.url;
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
