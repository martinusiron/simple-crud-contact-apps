import { Component } from "react";
import ContactService from '../services/service'

export default class Contact extends Component {
    constructor(props) {
        super(props)
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeAge = this.onChangeAge.bind(this)
        this.onChangePhoto = this.onChangePhoto.bind(this)

        this.getContact = this.getContact.bind(this)
        this.updateContact = this.updateContact.bind(this)
        this.deleteContact = this.deleteContact.bind(this)

        this.state = {
            currentContact: {
                id: null,
                firstName: "",
                lastName: "",
                age: 0,
                photo: ""
            },
            message: ""
        }
    }

    componentDidMount() {
        this.getContact(this.props.match.params.id)
    }

    getContact(id) {
        ContactService.get(id)
        .then(response => {
            this.setState({
                currentContact: response.data.data
            })
            console.log("response by id: ", response.data.data)
        }).catch(e => {
            console.log(e)
        })
    }

    onChangeFirstName(e) {
        const firstName = e.target.value
        this.setState(function(prevState) {
            return {
                currentContact : {
                    ...prevState.currentContact,
                    firstName: firstName
                }
            }
        })
    }

    onChangeLastName(e) {
        const lastName = e.target.value
        this.setState(function(prevState) {
            return {
                currentContact: {
                    ...prevState.currentContact,
                    lastName: lastName
                }
            }
        })
    }

    onChangeAge(e) {
        const age = e.target.value
        this.setState(function(prevState) {
            return {
                currentContact: {
                    ...prevState.currentContact,
                    age: age
                }
            }
        })
    }

    onChangePhoto(e) {
        const photo = e.target.value
        this.setState(function(prevState) {
            return {
                currentContact: {
                    ...prevState.photo,
                    photo: photo
                }
            }
        })
    }

    updateContact() {
        var formData= {
            firstName: this.state.currentContact.firstName,
            lastName: this.state.currentContact.lastName,
            age: this.state.currentContact.age,
            photo: this.state.currentContact.photo,
        }
        ContactService.update(
            this.state.currentContact.id,
            formData
        ).then(response => {
            this.setState({
                message: "The contact was updated successfully"
            })
            this.props.history.push("/contact")
        }).catch(e => {
            console.log(e)
        })
    }

    deleteContact() {
        ContactService.delete(
            this.state.currentContact.id
        ).then(response => {
            this.props.history.push("/contact")
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        const { currentContact } = this.state
        return (
            <div>
                {currentContact ? (
                <div className="edit-form">
                    <h4>Contact Info</h4>
                    <form>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={currentContact.firstName}
                        onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={currentContact.lastName}
                        onChange={this.onChangeLastName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                        type="text"
                        className="form-control"
                        id="age"
                        value={currentContact.age}
                        onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <input
                        type="text"
                        className="form-control"
                        id="photo"
                        value={currentContact.photo}
                        onChange={this.onChangePhoto}
                        />
                    </div>
                    </form>

                    <button
                    className="badge badge-danger mr-2"
                    onClick={this.deleteContact}
                    >
                    Delete
                    </button>

                    <button
                    type="submit"
                    className="badge badge-success"
                    onClick={this.updateContact}
                    >
                    Update
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Contact...</p>
                </div>
                )}
            </div>
        )
    }
}