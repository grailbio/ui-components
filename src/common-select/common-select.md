## Example

### Default

```js
const Fragment = require("react").Fragment;
const ExampleBlock = require("@grail/components").ExampleBlock;

// `countries` returns an array of { label: "Country Name", value: "COUNTRY_NAME" } objects;
const countries = require("../utils/constants").COUNTRIES;

class SelectExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <Fragment>
        <CommonSelect
          placeholder="Choose A Country"
          value={this.state.value}
          options={countries}
          onChange={this.handleChange}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </Fragment>
    );
  }
}

<SelectExample />;
```

### Creatable

```js
const Fragment = require("react").Fragment;
const ExampleBlock = require("@grail/components").ExampleBlock;

// `countries` returns an array of { label: "Country Name", value: "COUNTRY_NAME" } objects;
const countries = require("../utils/constants").COUNTRIES;

class SelectExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <Fragment>
        <CommonSelect
          isFullWidth
          selectType="creatable"
          placeholder="Create or Choose"
          createMessage={inputValue => `Invent a new country called "${inputValue}"`}
          options={countries}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </Fragment>
    );
  }
}

<SelectExample />;
```

### Asynchronous

```js
const Fragment = require("react").Fragment;
const ExampleBlock = require("@grail/components").ExampleBlock;

// `countries` returns an array of { label: "Country Name", value: "COUNTRY_NAME" } objects;
const countries = require("../utils/constants").COUNTRIES;

class SelectExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.filterCountries = this.filterCountries.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ value: countries[4] }), 1200);
  }

  handleChange(value) {
    this.setState({ value });
  }

  filterCountries(inputValue) {
    return new Promise(resolve => {
      const newCountries = countries
        .filter(country => country.label.toLowerCase().includes(inputValue.toLowerCase()))
        .slice(0, 5);
      setTimeout(() => resolve(newCountries), 500);
    });
  }

  render() {
    return (
      <Fragment>
        <CommonSelect
          isFullWidth
          placeholder="Choose A Country"
          selectType="async"
          initialMessage="Think of a country between A and B..."
          value={this.state.value}
          initialOptions={countries.slice(5, 10)}
          loadOptions={this.filterCountries}
          onChange={this.handleChange}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </Fragment>
    );
  }
}

<SelectExample />;
```

### Custom

```js
const ExampleBlock = require("@grail/components").ExampleBlock;
const Chip = require("@material-ui/core/Chip").default;

// `countries` returns an array of { label: "Country Name", value: "COUNTRY_NAME" } objects;
const countries = require("../utils/constants").COUNTRIES;
const styles = require("../utils/example-styles.module.scss");

class SelectExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div className={styles.selectContainer}>
        <CommonSelect
          classes={{
            root: styles.commonSelect,
          }}
          isFullWidth
          placeholder="Choose A Country"
          value={this.state.value}
          options={countries.map(country => ({ ...country, info: ["country", "place", "region"] }))}
          onChange={this.handleChange}
          formatOption={item => (
            <div>
              <span>{item.label}</span>
              <div>{item.info.map(info => <Chip label={info} />)}</div>
            </div>
          )}
        />
        <ExampleBlock strongHeader="state " content={this.state} />
      </div>
    );
  }
}

<SelectExample />;
```