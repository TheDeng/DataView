import React, {Fragment} from "react";
import {Button} from "antd";

class RefreshButton extends React.Component{
  render() {
    return(
      <Fragment>
        <Button onClick={this.props.callback} type={'primary'}>点击更新</Button>
      </Fragment>
    )
  }
}
export default RefreshButton
