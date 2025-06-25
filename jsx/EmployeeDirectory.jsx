class EmployeeDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            searchQuery: '', // New state for search query
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ employeeList { id firstName lastName age dateOfJoining title department employeeType currentStatus } }' }),
        });
        const result = await response.json();
        this.setState({ employees: result.data.employeeList });
    };

    addEmployee = async (employee) => {
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        this.loadData();
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query });
    };

    render() {
        const filteredEmployees = this.state.employees.filter(employee =>
            employee.firstName.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );

        return (
            <div>
                <h1>Employee Management System</h1>
                <EmployeeSearch onSearch={this.handleSearch} />
                <EmployeeTable employees={filteredEmployees} />
                <EmployeeCreate addEmployee={this.addEmployee} />
            </div>
        );
    }
}

class EmployeeSearch extends React.Component {
    handleInputChange = (e) => {
        this.props.onSearch(e.target.value); // Call the search handler from props
    };

    render() {
        return (
            <div>
                <h2>Search Employee</h2>
                <input type="text" placeholder="Search..." onChange={this.handleInputChange} />
                <input type="submit" value="Search" />
            </div>
        );
    }
}

class EmployeeTable extends React.Component {
    render() {
        return (
            <table border="1">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Date Of Joining</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Employee Type</th>
                        <th>Current Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.age}</td>
                            <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                            <td>{employee.title}</td>
                            <td>{employee.department}</td>
                            <td>{employee.employeeType}</td>
                            <td>{employee.currentStatus ? 'Working' : 'Retired'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
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
            employeeType: '',
            formErrors: {}
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, formErrors: {} }); // Clear errors on change
    };

    handleSubmit = (e) => {
        e.preventDefault();
        
        const { firstName, lastName, age, dateOfJoining, title, department, employeeType } = this.state;
        const errors = {};

        // Validation checks
        if (!firstName) errors.firstName = "First Name is required.";
        if (!lastName) errors.lastName = "Last Name is required.";
        if (!age) errors.age = "Age is required.";
        if (!dateOfJoining) errors.dateOfJoining = "Date of Joining is required.";
        if (!title) errors.title = "Title is required.";
        if (!department) errors.department = "Department is required.";
        if (!employeeType) errors.employeeType = "Employee Type is required.";

        // Set errors if any
        if (Object.keys(errors).length > 0) {
            this.setState({ formErrors: errors });
            return; // Stop the form submission
        }

        this.props.addEmployee(this.state);
        this.setState({ 
            firstName: '', 
            lastName: '', 
            age: '', 
            dateOfJoining: '', 
            title: '', 
            department: '', 
            employeeType: '',
            formErrors: {} // Clear errors after submission
        });
    };

    render() {
        const { formErrors } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Add Employee</h2>
                <input type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} />
                {formErrors.firstName && <div className="error">{formErrors.firstName}</div>}
                
                <input type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} />
                {formErrors.lastName && <div className="error">{formErrors.lastName}</div>}
                
                <input type="number" name="age" placeholder="Age" value={this.state.age} onChange={this.handleChange} min="20" max="70" />
                {formErrors.age && <div className="error">{formErrors.age}</div>}
                
                <input type="date" name="dateOfJoining" value={this.state.dateOfJoining} onChange={this.handleChange} />
                {formErrors.dateOfJoining && <div className="error">{formErrors.dateOfJoining}</div>}
                
                <select name="title" value={this.state.title} onChange={this.handleChange}>
                    <option value="">Select Title</option>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="VP">VP</option>
                </select>
                {formErrors.title && <div className="error">{formErrors.title}</div>}
                
                <select name="department" value={this.state.department} onChange={this.handleChange}>
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                </select>
                {formErrors.department && <div className="error">{formErrors.department}</div>}
                
                <select name="employeeType" value={this.state.employeeType} onChange={this.handleChange}>
                    <option value="">Select Employee Type</option>
                    <option value="FullTime">FullTime</option>
                    <option value="PartTime">PartTime</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                </select>
                {formErrors.employeeType && <div className="error">{formErrors.employeeType}</div>}
                
                <button type="submit">Add Employee</button>
            </form>
        );
    }
}

// Render the React app
const element = React.createElement(EmployeeDirectory);
ReactDOM.render(element, document.getElementById('root'));
