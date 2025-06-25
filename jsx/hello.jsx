
    class Hello extends React.Component{
        render(){
            const continents = ["Asia", "Europe","America", "Africa"];
            const issue =[{id:1, title:"bug number 1", owner:"Navdeep"},
                {id:2, title:"bug number 2", owner:"John"},
                {id:3, title:"bug number 3", owner:"John"},
                {id:4, title:"bug number 4", owner:"John"},

            ]
            const result= continents.map(c=>
                // <tr><td style={rowStyle}>{this.props.msg}Hello</td><td style={rowStyle}>`${c}`</td></tr>
                <tr><td style={rowStyle}>{issue.title}</td><td style={rowStyle}>`${c}`</td></tr>
            )
            const rowStyle={
                border:"1px solid silver", padding:4
            };
           
            return(<div title="Outer div">
                    <table border="2">
                        <thead>
                        <th style={rowStyle}>Message</th>
                        <th style={rowStyle}>Continent</th>
                        </thead>
                        <tbody>
                       {result}
                        </tbody>
                        
                        {/* <th>H1</th>
                        <th>H2</th> */}
                    </table>
                    </div>
                );
            }
        }
    
    const element = <Hello msg ="my world!"/>
    ReactDOM.render(element, document.getElementById('root'));
        
    // ReactDOM.render(element, document.getElementById('root'));