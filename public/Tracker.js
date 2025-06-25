class EmployeeDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      searchQuery: '' // New state for search query
    };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = async () => {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: '{ employeeList { id firstName lastName age dateOfJoining title department employeeType currentStatus } }'
      })
    });
    const result = await response.json();
    this.setState({
      employees: result.data.employeeList
    });
  };
  addEmployee = async employee => {
    const query = `mutation {
            addEmployee(employee: {
                firstName: "${employee.firstName}",
                lastName: "${employee.lastName}",
                age: ${employee.age},
                dateOfJoining: "${employee.dateOfJoining}",
                title: "${employee.title}",
                department: "${employee.department}",
                employeeType: "${employee.employeeType}"
            }) {
                id
            }
        }`;
    await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    this.loadData();
  };
  handleSearch = query => {
    this.setState({
      searchQuery: query
    });
  };
  render() {
    const filteredEmployees = this.state.employees.filter(employee => employee.firstName.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || employee.lastName.toLowerCase().includes(this.state.searchQuery.toLowerCase()));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Employee Management System"), /*#__PURE__*/React.createElement(EmployeeSearch, {
      onSearch: this.handleSearch
    }), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: filteredEmployees
    }), /*#__PURE__*/React.createElement(EmployeeCreate, {
      addEmployee: this.addEmployee
    }));
  }
}
class EmployeeSearch extends React.Component {
  handleInputChange = e => {
    this.props.onSearch(e.target.value); // Call the search handler from props
  };
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Search Employee"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: "Search...",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Search"
    }));
  }
}
class EmployeeTable extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("table", {
      border: "1"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Id"), /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Age"), /*#__PURE__*/React.createElement("th", null, "Date Of Joining"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employee Type"), /*#__PURE__*/React.createElement("th", null, "Current Status"))), /*#__PURE__*/React.createElement("tbody", null, this.props.employees.map(employee => /*#__PURE__*/React.createElement("tr", {
      key: employee.id
    }, /*#__PURE__*/React.createElement("td", null, employee.id), " ", /*#__PURE__*/React.createElement("td", null, employee.firstName), /*#__PURE__*/React.createElement("td", null, employee.lastName), /*#__PURE__*/React.createElement("td", null, employee.age), /*#__PURE__*/React.createElement("td", null, new Date(employee.dateOfJoining).toLocaleDateString()), /*#__PURE__*/React.createElement("td", null, employee.title), /*#__PURE__*/React.createElement("td", null, employee.department), /*#__PURE__*/React.createElement("td", null, employee.employeeType), /*#__PURE__*/React.createElement("td", null, employee.currentStatus ? 'Working' : 'Retired')))));
  }
}
class EmployeeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      age: '',
      dateOfJoining: '',
      title: '',
      department: '',
      employeeType: ''
    };
  }
  handleChange = e => {
    const {
      name,
      value
    } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addEmployee(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      age: '',
      dateOfJoining: '',
      title: '',
      department: '',
      employeeType: ''
    });
  };
  render() {
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("h2", null, "Add Employee"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "firstName",
      placeholder: "First Name",
      value: this.state.firstName,
      onChange: this.handleChange,
      required: true
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "lastName",
      placeholder: "Last Name",
      value: this.state.lastName,
      onChange: this.handleChange,
      required: true
    }), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "age",
      placeholder: "Age",
      value: this.state.age,
      onChange: this.handleChange,
      min: "20",
      max: "70",
      required: true
    }), /*#__PURE__*/React.createElement("input", {
      type: "date",
      name: "dateOfJoining",
      value: this.state.dateOfJoining,
      onChange: this.handleChange,
      required: true
    }), /*#__PURE__*/React.createElement("select", {
      name: "title",
      value: this.state.title,
      onChange: this.handleChange,
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select Title"), /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP")), /*#__PURE__*/React.createElement("select", {
      name: "department",
      value: this.state.department,
      onChange: this.handleChange,
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select Department"), /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering")), /*#__PURE__*/React.createElement("select", {
      name: "employeeType",
      value: this.state.employeeType,
      onChange: this.handleChange,
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select Employee Type"), /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "FullTime"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "PartTime"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal")), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Add Employee"));
  }
}

// Render the React app
const element = React.createElement(EmployeeDirectory);
ReactDOM.render(element, document.getElementById('root'));