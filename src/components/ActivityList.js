import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Form, Spinner, Tabs, Tab, Image, Button, Modal } from "react-bootstrap";
import { postActivity } from '../actions';
import img from '../assets/unknown.jpg'
import './styles.css'


class ActivityList extends Component {

  constructor(props) {
    super(props);
    this.state = { loaded: false, showModal: false }
  }

  componentDidMount() {
    this.setState({loaded: true, key: 'activity'})
  }

  avatar = (first, last) => {
    var init = first.charAt(0)  + last.charAt(0) 
    return (
      <div className="avatar-circle">
        <span className="initials">{init}</span>
      </div>
    )
  }
  showModal = () => {
    this.setState( { showModal: true, activityType: 'Add Enquiry', propertyUrl: '', teamMember: '', notes: '' })
  }
  hideModal = () => {
    this.setState( { showModal: false })
  }
  setTitle = (param) => {
    switch(param) {
      case 'Add Enquiry': return 'made a property enquiry';
      case 'Add Task': return 'created a task for '+this.state.teamMember
      default: return 'added a note'
    }
  }
  submitActivity = () => {
    var activity = {
      title: `${this.props.user.first_name} ${this.props.user.last_name} ${this.setTitle(this.state.activityType)}`,
      propertyUrl: this.state.propertyUrl,
      teamMember: this.state.teamMember,
      notes: this.state.notes
    }
    this.props.postActivity(activity)
    this.setState({ showModal: false })
  }

  setValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.loaded) {
      var activityRows = this.props.activities.map((activity, idx) => {
        return (
          <tr key={idx} className="activityLine">
              <td>
                {this.avatar(this.props.user.first_name, this.props.user.last_name)}
                <span style={styles.title}>{activity.title}</span>
                <span style={styles.detail}>{activity.notes}</span>
              </td>
          </tr>
        )
      })
      return (
        <div style={styles.container}>
          <Form>
            <h2>
              {this.props.mover.first_name} {this.props.mover.last_name}
            </h2>
            <div style={styles.movercontainer}>
              <Image src={img} style={styles.moverimage} />
              <span style={styles.movercaption}>Moving to</span>
              <span style={styles.moverlocation}>{this.props.mover.move_city}, {this.props.mover.move_country}</span>
            </div>
            <br />
            <Tabs
              activeKey={this.state.key}
              onSelect={key => {
                this.setState({ key })}
              }
            >
              <Tab eventKey="activity" title="Activity Feed">
                <div style={styles.addcontainer}>
                  <Button variant="outline-light" onClick={() => this.showModal()}>
                  <div style={styles.plusline}>
                    <i className="fa fa-plus-circle" style={styles.plus} />
                    <span style={styles.addactivity}>Add new activity</span>
                  </div>
                  </Button>
                  <Table responsive>
                    <tbody>
                    {activityRows}
                    </tbody>
                  </Table>
                </div>
              </Tab>
              <Tab eventKey="stats" title="Stats">
                Data not available
              </Tab>
              <Tab eventKey="documents" title="Documents">
                Data not available
              </Tab>
            </Tabs>
            <Modal show={this.state.showModal} onHide={()=>this.hideModal()} centered>
              <Modal.Header closeButton className="modalHeader">
                <Modal.Title>Add Activity</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formActivityType">
                    <Form.Label>Add Enquiry</Form.Label>
                    <Form.Control name="activityType" as="select" onChange={this.setValue} placeHolder="Add Enquiry">
                      <option>Add Enquiry</option>
                      <option>Add Note</option>
                      <option>Add Task</option>
                    </Form.Control>
                  </Form.Group>
                  {this.state.activityType!=='Add Task' &&
                  <Form.Group controlId="formPropertyUrl">
                    <Form.Control name="propertyUrl" onChange={this.setValue} placeholder="Add property URL (optional)" />
                  </Form.Group>}
                  {this.state.activityType==='Add Task' &&
                  <Form.Group controlId="formTeamMember">
                    <Form.Control name="teamMember" as="select" onChange={this.setValue}>
                      <option>lucy@ourmail.com</option>
                      <option>john@ourmail.com</option>
                      <option>sara@ourmail.com</option>
                      <option>fred@ourmail.com</option>
                    </Form.Control>
                  </Form.Group>}
                  <Form.Group controlId="formNotes">
                    <Form.Control name="notes" as="textarea" rows={3}  onChange={this.setValue} placeholder="Add notes.." />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="modalFooter">
                <Button variant="primary" onClick={this.submitActivity} centered>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </div>
      )
    }
    else {
      return (
        <div style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner animation='border' size='xl' style={styles.spinner} />
        </div>
      )
    }
  }
}

const styles = {
  container: {padding: 20, textAlign: 'left'},
  movercontainer: {display: "flex", alignItems: "center",  border:'1px solid lightGray', padding: 10 },
  movercaption: {color: 'gray', fontSize: 20},
  moverlocation: {color: 'blue', fontSize: 20, paddingLeft: 5},
  plusline: { padding: 10, display: "flex", flexDirection: "row", alignItems: "center" },
  plus: { color: 'blue', fontSize: '24px' },
  addactivity: { paddingLeft: 5, fontWeight: 'bold', color: 'black' },
  columnheading: {textAlign: 'left', color: "#773f0e", fontSize: 16, width: 180, fontWeight: 'normal'},
  moverimage: {height: 40, width: 40, borderRadius: '50%', paddingRight: 10 },
  title: {paddingLeft: 5, textAlign: 'left', fontSize: 16, color: "black", fontWeight: "bold"},
  detail: {paddingLeft: 5, textAlign: 'left', fontSize: 16, color: "black", fontWeight: "normal"},
  spinner: {color: "#773f0e"}
}

ActivityList.propTypes = {
  postActivity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.app.user,
  mover: state.app.mover,
  activities: state.app.activities
});

const actions = {postActivity};
export default connect(mapStateToProps, actions) (ActivityList);
