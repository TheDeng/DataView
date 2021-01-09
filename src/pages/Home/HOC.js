import RefreshButton from "./Components/RefreshButton";
import React from "react";

function ppHOC(WrappedComponent) {
  return class WrappedCompo extends React.Component {
    render() {
      return (
        <div>
          <div style={{float: 'left'}}>
            <WrappedComponent {...this.props}/>
          </div>
          <div style={{float:'right'}}>
            <RefreshButton callback={this.props.update}></RefreshButton>
          </div>
        </div>

      )
    }
  }
}
export default ppHOC
