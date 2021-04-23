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
        this.newContact = this. newContact.bind(this)

        this.state = {
            id: null,
            firstName: "",
            lastName: "",
            age: 0,
            photo: undefined,
            submitted: false,
            showModal: false
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

    saveContact() {
        const formData = new FormData()
        formData.append("firstName", this.state.firstName)
        formData.append("lastName", this.state.lastName)
        formData.append("age", this.state.age)
        formData.append("photo", this.state.photo)
        
        ContactService.create(formData)
        .then(response => {
            setTimeout(() =>
            {
                this.setState({ showModal: true });
            },200)
            this.props.history.push("/contact")
            console.log("response create: ", response.data)
        }).catch(e => {
            console.log(e)
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
                {this.state.submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={this.newContact}>
                    Add
                    </button>
                </div>
                ) : (
                <div>
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
                    </div>
        
                    <button onClick={this.saveContact} className="btn btn-success">
                    Submit
                    </button>
                </div>
                )}
            </div>
        )
    }
}