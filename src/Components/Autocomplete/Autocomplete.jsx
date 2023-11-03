import React from "react";
import style from './Autocomplete.module.css'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";

const Autocomplete = ({isLoaded,onSelect}) =>{

    const {
        ready,
        value,
        suggestions: { status, data },
        
        setValue,
        init,
        clearSuggestions,
      } = usePlacesAutocomplete({
        initOnMount:false,
        debounce: 300,
      });
      const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
      };
    
      const handleSelect =
        ({ description }) =>
        () => {
          // When the user selects a place, we can replace the keyword without request data from API
          // by setting the second parameter to "false"
          setValue(description, false);
          clearSuggestions();
          console.log(description);
          // Get latitude and longitude via utility functions
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng });
            onSelect( { lat, lng });
          });
        };
    
      const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li className={style.listItem} key={place_id} onClick={handleSelect(suggestion)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        });
    
React.useEffect(()=>{
    if(isLoaded){
        init();
    }
},[isLoaded,init])

    return(
        
        <div className={style.container} ref={ref}>
            <input type="text"  className={style.input}  
             value={value}
             onChange={handleInput}
             disabled={!ready}
             placeholder="Where are you going?"
            />
            {status === "OK" && <ul className={style.suggestions}>{renderSuggestions()}</ul>}
        </div>
    )
}



export default Autocomplete;