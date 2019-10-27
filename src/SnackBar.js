import React, { Component } from 'react'
import { Icon } from 'office-ui-fabric-react/lib/Icon';


export default class SnackBar extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div className = "snackbar">
                <div className = "snackbar-text">
                    {"Added " + this.props.word}
                </div>
                <div className = "snackbar-icon">
                    <Icon iconName = {"SkypeCheck"}/>
                </div>
            </div>
        )
    }
}
