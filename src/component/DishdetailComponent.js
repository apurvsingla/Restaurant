import React, {Component} from 'react'; 
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Label, Col, Row} from 'reactstrap'; 
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import dateFormat from 'dateformat';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <=len);
const minLength = (len) => (val) => (val) && (val.length >=len);


function RenderDish({dish}) { 
        if (dish != null) {       
            return(            
                <div>      
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card>
                            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>                        
            );
        }
        else {
            return (
                <div></div>
            )
        }             
    }
    
    function RenderComments({comments, postComment, dishId}) {     
        if (comments != null) {  
                return (                    
                    <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((com) => {
                           return (
                            <Fade in>
                                <li key={com.id}>
                                    <p>{com.comment}</p>
                                    <p> --{com.author}, {dateFormat(new Date(), "mmmm dS, yyyy")}</p>
                                </li>  
                            </Fade>                         
                           );
                        })}        
                    </Stagger>                  
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                    </div>
                );
           
        }
        else {
            return (
                <div></div>
            );
        }
    }

    class CommentForm extends Component {
        constructor(props) {
            super(props);
            
            this.state = {
                isModalOpen: false
            }

            this.toggleModal= this.toggleModal.bind(this); 
            this.handleSubmit = this.handleSubmit.bind(this); 
            
        }
        
        handleSubmit(values) { //this function now will receive values as a parameter
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);  
        }

        toggleModal() { 
            this.setState({
             isModalOpen: !this.state.isModalOpen
        });
       }
    
        render() {
            return(
                <div>
                <Button  onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
               <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                      <Row>
                        <Label htmlFor="rating" md={2}>Rating</Label>
                        <Col md={10} >
                           <Control.select model=".rating" id="rating" name ="rating"className="form-control" validators={{required}}>
                               <option></option>
                               <option>1</option>        
                               <option>2</option>
                               <option>3</option>
                               <option>4</option>
                               <option>5</option>
                           </Control.select>
                        </Col>
                      </Row>

                      <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label> 
                                  <Col md={10} >
                                    <Control.text model=".author" id="author" name ="author"  
                                    placeholder="Your Name" 
                                    className="form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                       <Errors
                                       className="text-danger"
                                       model=".author"
                                       show="touched"
                                       messages={{
                                           required: 'Required',
                                           minLength: 'Must be greater than 3 characters',
                                           maxLength: 'Must be 15 characters of less'

                                       }}
                                       />     
                                </Col>
                        </Row>
                        
                        <Row className="form-group">
                                <Label htmlFor="comment" md={2} >Comment</Label> 
                                <Col md={10} >
                                    <Control.textarea model=".comment" id="comment" name ="comment" rows="6" className="form-control" />
                                </Col>
                            </Row> 

                        <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary" onClick={this.toggleModal}>Submit</Button>
                                </Col>
                        </Row>

                    </LocalForm>
               </ModalBody>
             </Modal>
               </div>
            )
        }
    }

    const DishDetail = (props) => {  
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                      <Loading />  
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                      <h4>{props.errMess}</h4>  
                    </div>
                </div>
            );
        }
        else if (props.dish !=null)     
        return (
            <div className="container">
                <div className="row">
                <Breadcrumb>
                   <BreadcrumbItem>
                   <Link to='/menu'>Menu</Link>
                   </BreadcrumbItem>
                   <BreadcrumbItem active>
                   {props.dish.name}
                   </BreadcrumbItem>
                </Breadcrumb> 
                <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
                </div>
              </div>
                <div className="row">
                     <div className="col-12 col-md-5 m-1">            
                        <RenderDish dish={props.dish} />
                     </div> 
                     <div className="col-12 col-md-5 m-1">   
                     <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                        
                    </div>
                </div>                                   
            </div>
        ); 
        else
        return (
            <div></div>
        );
        
    }    


export default DishDetail;