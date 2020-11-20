
import React, { Component, createRef } from 'react';
import '../style.css';
const alertClasses = {
    "error": "alert-danger",
    "success": "alert-success"
}

class Message extends Component {
    constructor() {
        super();
        this.state = {};
        this.timeoutHide=undefined;
        this.closeButtonRef=createRef();
    }

    componentDidMount(){
        this.timeoutHide=setTimeout(() => {
            this.closeButtonRef.current.click();
        }, 5000);
    }

    render() {
        return (
            <div className="w-100">
                <div className={alertClasses[this.props.messageType] + " user-message alert alert-dismissible fade show"} role="alert">
                    {this.props.messageText}
                    <button ref={this.closeButtonRef} type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>)
    }
}

export default Message;