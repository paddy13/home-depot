import React from "react";
import Currencies from "../data/currencies";

/*
* @function currencyInputGroup
* @params props
* 
* invoked as <CurrencyInputGroup name={string} inputType={string} inputValue={number} handleOnChange={function} selectValue={string} />
* This function is a stateless function which return input and option box.
*/
function CurrencyInputGroup(props) {
    return (
        <div>
            <input 
                name={props.name + 'Input'}
                type={props.inputType}
                value={props.inputValue}
                onChange={props.handleOnChange}
            />
            <select
                name={props.name + 'Select'}
                onChange={props.handleOnChange}
                value={props.selectValue}
            >
                {
                    Currencies.map(cur => <option key={cur}>{cur}</option>)
                }
            </select>
        </div>
    )
}

export default CurrencyInputGroup;
