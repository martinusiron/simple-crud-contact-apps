import { Component } from 'react';
import ContactService from '../services/service'
import { Link } from 'react-router-dom'

export default class ListContacts extends Component {
    constructor(props) {
        super(props)
        this.retrieveContacts = this.retrieveContacts.bind(this)
        this.setActiveContact = this.setActiveContact.bind(this)
        this.deleteContact = this.deleteContact.bind(this)
        this.addContact = this.addContact.bind(this)
        this.state = {
            contacts: [],
            currentIndex: -1,
            currentContact: null,
        }
    }

    componentDidMount() {
        this.retrieveContacts()
    }

    retrieveContacts() {
        ContactService.getAll()
        .then(response => {
            this.setState({
                contacts: response.data.data
            })
            console.log("response: ", response.data.data)
        }).catch(e => {
            console.log(e)
        })
    }

    setActiveContact(contact, index) {
        console.log("contact: ", contact)
        this.setState({
            currentContact: contact,
            currentIndex: index
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

    addContact() {
        this.props.history.push("/add")
    }

    render() {
        const { contacts, currentContact, currentIndex } = this.state;
        return(
            <div className="list row">
                <div className="col-md-6">
                    <h4>Contact List</h4>
                    <ul className="list-group">
                        {contacts &&
                        contacts.map((contact, index) => (
                            <li className= {
                                    "list-group-item " + (index === currentIndex ? "active" : "") 
                                }
                                onClick={() => this.setActiveContact(contact, index)}
                                key={index}
                            >
                            {contact.firstName + " " + contact.lastName}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-success"
                        onClick={this.addContact}
                    >
                        Add Contact
                    </button>
                </div>
                <div className="col-md-6">
                    {currentContact ? (
                        <div>
                            <h4>Contact Info</h4>
                            <div>
                                <label>
                                    <strong>Fullname : </strong>
                                </label> {" "}
                                {currentContact.firstName + " " + currentContact.lastName}
                            </div>
                            <div>
                                <label>
                                    <strong>Age : </strong>
                                </label> {" "}
                                {currentContact.age}
                            </div>
                            <div>
                                <label>
                                    <strong>Photo</strong>
                                </label> {" "}
                                <br />
                                <img src={currentContact.photo} />
                            </div>
                            <div>
                                <Link to={"/contact/" + currentContact.id} className="badge badge-warning">Edit</Link>
                                {"   "}
                                <Link className="badge badge-danger mr-2" onClick={this.deleteContact}>Delete</Link>
                            </div>
                            
                        </div>
                    )  : (
                        <div>
                        <br />
                            <p>Please click on a contact...</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}