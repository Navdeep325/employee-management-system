class Hello extends React.Component {
  render() {
    const continents = ["Asia", "Europe", "America", "Africa"];
    const issue = [{
      id: 1,
      title: "bug number 1",
      owner: "Navdeep"
    }, {
      id: 2,
      title: "bug number 2",
      owner: "John"
    }, {
      id: 3,
      title: "bug number 3",
      owner: "John"
    }, {
      id: 4,
      title: "bug number 4",
      owner: "John"
    }];
    const result = continents.map(c =>
    /*#__PURE__*/
    // <tr><td style={rowStyle}>{this.props.msg}Hello</td><td style={rowStyle}>`${c}`</td></tr>
    React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, issue.title), /*#__PURE__*/React.createElement("td", {
      style: rowStyle
    }, "`$", c, "`")));
    const rowStyle = {
      border: "1px solid silver",
      padding: 4
    };
    return /*#__PURE__*/React.createElement("div", {
      title: "Outer div"
    }, /*#__PURE__*/React.createElement("table", {
      border: "2"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Message"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Continent")), /*#__PURE__*/React.createElement("tbody", null, result)));
  }
}
const element = /*#__PURE__*/React.createElement(Hello, {
  msg: "my world!"
});
ReactDOM.render(element, document.getElementById('root'));

// ReactDOM.render(element, document.getElementById('root'));