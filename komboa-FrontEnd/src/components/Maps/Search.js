import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

import {Combobox, ComboboxInput, ComboboxPopover, ComboboxOption, ComboboxList} from '@reach/combobox'
import "@reach/combobox/styles.css";

const SearchLocation = () => {

    const {ready, value, setValue, suggestions: {status, data}, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => -1.286389, lng: () => 36.817223},
            radius: 200 * 1000
        }
    })

    const handleInput = (e) => {
        setValue(e.target.value)
    }

    return (
        <div >
            <Combobox 
                onSelect = {(address) => console.log(address)}
            >
               <div className="col-xs-12 col-sm-4 col-md-4">
               
                </div>
                <ComboboxPopover>
                  <ComboboxList>
                  {status === 'OK' && data.map(({place_id, description}) => {
                        return (
                            <ComboboxOption key = {place_id} value = {description}/>
                        )
                    }
                  )}
                  </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}
 
export default SearchLocation;