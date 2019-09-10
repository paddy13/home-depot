import React from "react";
import axios from "axios";
import Currencies from "../data/currencies";

import InputAndCurrencyMenu from "../utils/InputAndCurrencyMenu";

class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rates: {},
            amount: 1,
            convertedAmount: 0,
            baseCurrency: 'EUR',
            targetCurrency: 'CAD'
        }
    }

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

    handleBaseAmtChange = (event) => {
        const {rates, targetCurrency, baseCurrency} = this.state;
        const convertedAmount = event.target.value * (rates[targetCurrency]/rates[baseCurrency]).toFixed(2);
        this.setState({ 
            convertedAmount,
            amount: event.target.value 
        });
    }

    render() {
        return (
            <div>
                Currency Converter<br />
                Type in amount and select currency:<br />
                <InputAndCurrencyMenu 
                    inputType='number'
                    inputValue={this.state.amount}
                    inputChange={this.handleBaseAmtChange}
                    selectChange={event => this.setState({ baseCurrency: event.target.value })}
                    selectValue={this.state.baseCurrency}
                /><br />
                <InputAndCurrencyMenu 
                    inputType='number'
                    inputValue={this.state.convertedAmount}
                    inputChange={event => this.setState({ convertedAmount: event.target.value })}
                    selectChange={event => this.setState({ targetCurrency: event.target.value })}
                    selectValue={this.state.targetCurrency}
                />
            </div>
        );
    }
}

export default CurrencyConverter;
