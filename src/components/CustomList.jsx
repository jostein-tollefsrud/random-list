import React, { Component } from 'react';
import './CustomList.css';

const INITIAL_LIST = ['apple', 'pineapple', 'pen', 'orange', 'banana', 'tomato', 'melon'];
const DEFAULT_CONTROLS = ['clear', 'reset', 'push'];
const DEFAULT_STATE = {
    list: INITIAL_LIST,
    input: {
        value: '',
        index: null
    }
}

class CustomList extends Component {
    constructor(props) {
        super(props);
        this.state = { ...DEFAULT_STATE, list: this.props.list };
        this.clearArray = this.clearArray.bind(this);
        this.pushElem = this.pushElem.bind(this);
        this.resetArray = this.resetArray.bind(this);
        this.isControlSet = this.isControlSet.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.addElement = this.addElement.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    clearArray() {
        this.setState({ list: [] });
    }

    pushElem() {
        const randomString = Math.random().toString(36).substring(2, 7);
        this.setState((state) => {
            return {
                list: [...state.list, randomString],
            };
        });
    }

    resetArray() {
        this.setState({ list: [...this.props.list] });
    }

    isControlSet(controlName) {
        return this.props.controls.find((elem) => elem === controlName);
    }

    onChangeValue(event) {
        if (this.state.input.index !== null) {
            // you are editing
            for (let i = 0; i < this.state.list.length; i++) {
                if (this.state.input.index === i) {
                    let items = [...this.state.list];
                    let item = [...items[i]];
                    item = event.target.value;
                    items[i] = item;
                    this.setState((state) => ({
                        ...state,
                        list: items,
                    }));
                }
            }
        }
        this.setState((state) => ({
            ...state,
            input: {
                ...state.input,
                value: event.target.value,
            },
        }));
    }

    // Reset input onBlur, only when editing an item
    resetInput() {
        if (this.state.input.index !== null) {
            this.setState((state) => ({
                ...state,
                input: {
                    value: "",
                    index: null,
                },
            }));
        }
    }

    addElement() {
        if (!this.state.input.value.length) return;
        this.setState((state) => ({
            ...state,
            list: [...state.list, state.input.value],
            input: {
                ...state.input,
                value: "",
            },
        }));
    }

    selectItem(item, i) {
        this.setState((state) => ({
            ...state,
            input: {
                value: item,
                index: i,
            },
        }));
    }

    handleKeyDown(event) {
        if (event.key === "Enter") {
            if (this.state.input.index !== null) { // you are editing
                for (let i = 0; i < this.state.list.length; i++) {
                    if (this.state.input.index === i) {
                        let items = [...this.state.list];
                        let item = [...items[i]];
                        item = event.target.value;
                        items[i] = item;
                        this.setState((state) => ({
                            ...state,
                            list: items,
                        }));
                    }
                }
                // reset the input value after pressing enter
                if (this.state.input.index !== null) {
                    this.setState((state) => ({
                        ...state,
                        input: {
                            value: "",
                            index: null,
                        },
                    }));
                }
            } else {
                this.addElement();
            }
        }
    }

    render() {
        return (
            <div className="container">
                <ul className="list-container">
                    {this.state.list.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => this.selectItem(item, index)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="sticky-container">
                    <div className="button-container">
                        <label htmlFor="input">List item</label>
                        <input
                            id="input"
                            type="text"
                            value={this.state.input.value}
                            onBlur={this.resetInput}
                            onChange={this.onChangeValue}
                            autoComplete="off"
                            onKeyDown={this.handleKeyDown}
                        />
                        <button onClick={this.addElement}>Add element</button>
                        {this.isControlSet("push") && (
                            <button onClick={this.pushElem}>
                                Add random string
                            </button>
                        )}
                        {this.isControlSet("reset") && (
                            <button onClick={this.resetArray}>
                                Reset array
                            </button>
                        )}
                        {this.isControlSet("clear") && (
                            <button id="clear" onClick={this.clearArray}>
                                Clear array
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    static defaultProps = {
        controls: DEFAULT_CONTROLS,
        list: INITIAL_LIST,
    };
}

export default CustomList;