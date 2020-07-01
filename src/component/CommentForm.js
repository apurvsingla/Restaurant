import React, {Component} from 'react';
import { Control, LocalForm, Errors, Field } from 'react-redux-form';
import { Button, Row, Col, Label } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            toggle: false,
        }

        this.enterComment = this.enterComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    enterComment(comment){
        this.state.enterComment = !this.state.enterComment;
    }

    handleSubmit(values){
        console.log("Current State is: "+ JSON.stringify(values));
        alert("Current State is: "+ JSON.stringify(values));
    }

    showComment(){
        return(
            <div className="row row-contnet">
                    <div className="col-12">
                        <h3 className="mb-4 mt-2">Submit Comment</h3>
                        <hr></hr>
                    </div>
                    <div className="col-12 col-md-9">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Col className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Field name="favoriteColor" component="select"
                                    className="form-control" model=".rating" 
                                    id="rating" name="rating" validators={{
                                        required}}>
                                        <option></option>
                                        <option value="#ff0000">1</option>
                                        <option value="#00ff00">2</option>
                                        <option value="#0000ff">3</option>
                                        <option value="#0000ff">4</option>
                                        <option value="#0000ff">5</option>
                                    </Field>
                                        <Errors 
                                        className="text-danger"
                                        model=".firstname" 
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                        }} />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                         validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                        <Errors 
                                        className="text-danger"
                                        model=".name" 
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }} />
                                </Col>
                            </Col>
                            <Col className="form-group">
                                <Label htmlFor="message" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Col>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 1}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
        );
    }


    render(){
        return(
            <div className="container">
                <Button onClick={this.enterComment}>Add Comment</Button>
            </div>
        );
    }
}

export default CommentForm;