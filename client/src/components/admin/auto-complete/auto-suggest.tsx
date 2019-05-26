import React from "react";
import Select from "react-select";
import CreatableSelect from 'react-select/lib/Creatable';


interface IProps {
  options: any;
  className?: any;
  isMulti: boolean;
  defaultValue: any;
  creatable: boolean;
}

interface DispProps {
  handleChange: (value: string) => void;
}

interface IState {
  selectedOption: any;
}

class AutoSuggest extends React.Component<IProps & DispProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedOption: ""
    };
  }
  handleChange = (selectedOption: any) => {
    this.setState({ selectedOption: selectedOption });
    if (this.props.isMulti === true) {
      const newSelectedOption = selectedOption.map ((name: any) => {
        return {name: name.label, label: name.label, id: name.id};
      });
      this.props.handleChange(newSelectedOption);
    } else {
      this.props.handleChange(selectedOption.value);
    }
  };
  render() {
    const options = this.props.options.map( (item: any) => { return ({name: item.name, label: item.name, id: item.id, value: item.id})})
    const defaultValue =
      this.props.isMulti === true
        ? this.props.defaultValue.map( (item: any) => { return ({name: item.name, label: item.name, id: item.id, value: item.id})})
        : { label: this.props.defaultValue, value: this.props.defaultValue };
    if(this.props.creatable === true) {
      return (
        <CreatableSelect
          // value={this.state.selectedOption}
          onChange={this.handleChange}
          options={options}
          isMulti={this.props.isMulti}
          placeholder="Select Option"
          isSearchable={true}
          closeMenuOnSelect={!this.props.isMulti}
          defaultValue={defaultValue}
          className="autoSuggest"
          classNamePrefix="autoSuggest"
        />
      );
    } else {
    return (
      <Select
        // value={this.state.selectedOption}
        onChange={this.handleChange}
        options={options}
        isMulti={this.props.isMulti}
        placeholder="Select Option"
        isSearchable={true}
        closeMenuOnSelect={!this.props.isMulti}
        defaultValue={defaultValue}
        className="autoSuggest"
        classNamePrefix="autoSuggest"
      />
    );
    }
  }
}

export default AutoSuggest;
