import React from "react";
import axios from "axios";
import Currencies from "../data/currencies";

import CurrencyInputGroup from "../utils/CurrencyInputGroup";

/*
* @class CurrencyConverter 
* 
* invoked as <CurrencyConverter />
* This class renders the main application which is a currency converter
*/
class CurrencyConverter extends React.Component {
    /* 
    * @function constructor
    * @params props
    * Also, initialized default state values here
    */
    constructor(props) {
        super(props);
        this.state = {
            rates: {},
            amount: 1,
            convertedAmount: 0,
            baseCurrency: 'EUR',
            targetCurrency: 'CAD',
            displayRates: false
        }
    }

    /* 
    * @function componentDidMount
    * 
    * This function fetch the latest currency rates for the provided currencies and store them in state
    */
    componentDidMount() {
        axios
        .get("http://data.fixer.io/api/latest?access_key=ebe9654e432d895a17faa75a70ea792f&symbols=" + Currencies)
        .then(response => {
            const {rates} = response.data;
            this.setState({ 
                rates,
                convertedAmount: rates[this.state.targetCurrency].toFixed(2)
            });
        })
        .catch(err => {
            console.log("oh no!!", err);
        });
    }

    /* 
    * @function handleBaseInputChange
    * @param event
    * This function contains the main logic. It calculates the converted amount depending upon
    * from which event it is invoked.
    */
    handleBaseInputChange = (event) => {
        const {rates, targetCurrency} = this.state;
        if (event.target.name === 'baseInput') {
            var convertedAmount = event.target.value * (rates[targetCurrency]/rates[this.state.baseCurrency]).toFixed(2);
            this.setState({ amount: event.target.value });
        } else if (event.target.name === 'baseSelect') {
            convertedAmount = this.state.amount * (rates[targetCurrency]/rates[event.target.value]).toFixed(2);
            this.setState({ baseCurrency: event.target.value });
        }
        this.setState({ convertedAmount });
    }

    /* 
    * @function handleToInputChange
    * @param event
    * This function is basically updating the state of the currency to which it has to be converted
    * TODO: In next version, this function can be merged with `handleBaseInputChange` function so that,
    * we can have vice-versa effect i.e changing either of text input or selecting currency from options,
    * the amount will be converted.
    */
    handleToInputChange = (event) => {
        if (event.target.name === 'toInput') {
            this.setState({ convertedAmount: event.target.value })
        } else if (event.target.name === 'toSelect') {
            this.setState({ targetCurrency: event.target.value })
        }
    }

    render() {
        return (
            <div id='main-container'>
                <p>Currency Converter</p>
                <p>Type in amount and select currency:</p>
                <div className='inputCurrency'>
                    <CurrencyInputGroup
                        name='base'
                        inputType='number'
                        inputValue={this.state.amount}
                        handleOnChange={this.handleBaseInputChange}
                        selectValue={this.state.baseCurrency}
                    />
                </div>
                <div className='inputCurrency'>
                    <CurrencyInputGroup
                        name='to'
                        inputType='number'
                        inputValue={this.state.convertedAmount}
                        handleOnChange={this.handleToInputChange}
                        selectValue={this.state.targetCurrency}
                    />
                </div>
                <div className='disclaimer' onClick={() => this.setState({ displayRates: !this.state.displayRates })}> Disclaimer </div>
                {
                    this.state.displayRates && <h4>Rates of currencies per {this.state.baseCurrency}</h4>
                }
                <ul>
                    {
                        this.state.displayRates && (
                            Object.values(this.state.rates).map((rate, i) => {
                                if (Currencies[i] === this.state.baseCurrency) {
                                    return '';
                                }
                                const newRate = rate/this.state.rates[this.state.baseCurrency];
                                return <li key={rate}>{Currencies[i]}: {newRate.toFixed(2)}</li>
                            })
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default CurrencyConverter;
