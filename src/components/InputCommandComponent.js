import React, { Component } from 'react';
import AceEditor from "react-ace";
import ReactResizeDetector from 'react-resize-detector'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";


class InputCommandComponent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            editorHeight: 400,
            editorWidth: "auto"
        }
        this.onResize = this.onResize.bind(this)
    }

    onResize (w, h) {
        this.setState({
            editorHeight: h,
            editorWidth: w
        })
    }

    render() {
        return (
            <>
                <div className="input-command-component">
                    <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
                    <AceEditor className="input-command"
                        ref="inputCommand"
                        onChange={this.props.onChangeInputCommand}
                        width={this.state.editorWidth}
                        height={this.state.editorHeight}
                        fontSize="18px"
                        mode="javascript"
                        theme="dracula"
                    />
                </div>
            </>
        )
    }
}
export default InputCommandComponent;