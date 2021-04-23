import { Component } from 'react';
import ContactService from '../services/service'
import { Link } from 'react-router-dom'

export default class ListContacts extends Component {
    constructor(props) {
        super(props)
        this.retrieveContacts = this.retrieveContacts.bind(this)
        this.setActiveContact = this.setActiveContact.bind(this)
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
                </div>
                <div className="col-md-6">
                    {currentContact ? (
                        <div>
                            <h4>Contact Info</h4>
                            <div>
                                <label>
                                    <strong>Fullname</strong>
                                </label> {" "}
                                {currentContact.firstName + " " + currentContact.lastName}
                            </div>
                            <div>
                                <label>
                                    <strong>Age</strong>
                                </label> {" "}
                                {currentContact.age}
                            </div>
                            <div>
                                <label>
                                    <strong>Photo</strong>
                                </label> {" "}
                                <img src={currentContact.photo} />
                            </div>
                            <Link to={"/contact/" + currentContact.id} className="badge badge-warning">Edit</Link>
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