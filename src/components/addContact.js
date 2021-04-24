import { Component } from "react";
import ContactService from '../services/service'

export default class AddContact extends Component {
    constructor(props) {
        super(props)
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeAge = this.onChangeAge.bind(this)
        this.onChangePhoto = this.onChangePhoto.bind(this)

        this.saveContact = this.saveContact.bind(this)
        this.newContact = this.newContact.bind(this)

        this.state = {
            id: null,
            firstName: "",
            lastName: "",
            age: 0,
            photo: "",
            submitted: false,
            showModal: false,
            message: ""
        }
    }

    componentDidMount() {

    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onChangePhoto(e) {
        this.setState({
            photo: e.target.files
        })
    }

    saveContact(e) {
        this.setState({
            submitted: true
        })
        e.preventDefault()
        const formData = new FormData()
        formData.append("firstName", this.state.firstName)
        formData.append("lastName", this.state.lastName)
        formData.append("age", this.state.age)
        formData.append("photo", "N/A")
        
        ContactService.create(formData)
        .then(response => {
            this.setState({
                message: response.data.message
            })
            this.props.history.push({pathname: "/contact"})
        }).catch(e => {
            this.setState({
                message: e.response.data.message
            })
        })
    }

    newContact() {
        this.setState({
            id: null,
            firstName: "",
            lastName: "",
            age: 0,
            photo: "",
            submitted: false
        })
    }

    render() {
        return (
            <div className="submit-form">
                <div>
                    <form onSubmit={this.saveContact}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                required
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                                name="firstName"
                            />
                            {this.state.submitted && !this.state.firstName && <span className="error-msg">Please enter a first name</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                required
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                                name="lastName"
                            />
                            {this.state.submitted && !this.state.lastName && <span className="error-msg">Please enter a last name</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="text"
                                className="form-control"
                                id="age"
                                required
                                value={this.state.age}
                                onChange={this.onChangeAge}
                                name="age"
                            />
                            {this.state.submitted && !this.state.age && <span className="error-msg">Please enter age</span>}
                        </div>
            
                        <div className="form-group">
                            <label htmlFor="photo">Photo</label>
                            <input
                                type="file"
                                className="form-control"
                                id="photo"
                                required
                                onChange={this.onChangePhoto}
                                name="photo"
                            />
                            {this.state.submitted && !this.state.photo && <span className="error-msg">Please upload photo</span>}
                        </div>
            
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}