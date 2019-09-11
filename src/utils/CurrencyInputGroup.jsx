import React from "react";
import Currencies from "../data/currencies";

function CurrencyInputGroup(props) {
    return (
        <div>
            <input 
                type={props.inputType}
                value={props.inputValue}
                onChange={props.inputChange}
            />
            <select
                onChange={props.selectChange}
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
