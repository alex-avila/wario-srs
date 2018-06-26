import React, { Component } from 'react';

import { connect } from 'react-redux'
import { uploadCSV } from '../../redux/decksReducer'

import Button from '../Button'
import Dropzone from 'react-dropzone'

import './index.css'

class UploadModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null,
            isUploadAccepted: false,
            inputs: {
                name: '',
                description: ''
            },
        }
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState(prevState => ({
            inputs: {
                ...prevState.inputs,
                [name]: value
            }
        }))
    }

    onDrop = (accepted, rejected) => {
        if (accepted.length === 1) {
            this.setState({ file: accepted[0], isUploadAccepted: true })
        }
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.file)
        data.append('name', this.state.inputs.name)
        data.append('description', this.state.inputs.description)
        this.props.uploadCSV(data)
    }

    render() {
        const { isModalOn, handleHideModal } = this.props
        let modalClasses = "upload-deck-modal"
        if (isModalOn) {
            modalClasses += " modal__show"
        }
        return (
            <div
                id="background"
                className={modalClasses}
                onClick={handleHideModal}
            >
                <div className="upload-deck-modal__wrapper">
                    {
                        !this.state.isUploadAccepted ?
                        <Dropzone 
                            accept="text/csv"
                            className="dropzone"
                            onDrop={this.onDrop}
                        >
                        {({ isDragActive, isDragReject }) => {
                            if (isDragReject) {
                                return "This is not a csv file."
                            }
                            if (isDragActive) {
                                return "Drop it."
                            }
                            return (
                                <div>
                                    <div>Drag &amp; Drop</div>
                                    <div><small>(or click to select a csv file)</small></div>
                                </div>
                            )
                        }}
                            
                        </Dropzone> :
                        <p>{this.state.file.name} was uploaded.</p>
                    }
                    <input
                        name="name"
                        type="text" 
                        placeholder="Name"
                        onChange={this.handleChange}
                        value={this.state.inputs.name}
                        autoComplete="off"
                    />
                    <textarea
                        name="description"
                        type="text" 
                        placeholder="Describe this deck..."
                        onChange={this.handleChange}
                        value={this.state.inputs.description}
                        autoComplete="off"
                    />
                    <Button rounded onClick={this.handleUpload}>UPLOAD DECK</Button>
                </div>
            </div>
        );
    }
}

export default connect(null, { uploadCSV })(UploadModal)