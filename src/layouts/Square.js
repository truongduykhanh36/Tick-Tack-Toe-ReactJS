import React from 'react';

class Square extends React.Component{
    render(){
        const classForCell = `square ${this.props.curSelect} ${this.props.winner}`;
        return(
            <button className={classForCell} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;