import React from 'react';

class Form extends React.Component{
    render() {
        return (
            <div style={{"width": "200px", "margin": " 10px auto"}}>
                <form>
                    <div className="form-group">
                        <label>Enter Size Of Board:</label>
                        <input className="form-control" onChange={this.props.handleInputChange}/>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.props.handleSubmitForm}>Create Board</button>
                </form>
            </div>
        );
    }
}
export default Form;