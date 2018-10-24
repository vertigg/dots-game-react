import React from 'react';

class Intersection extends React.Component{
    render(){
        var style = {
        }
        return(
            <div className="square" style={style}>{this.props.index}</div>
        );
    }
}

export default Intersection;