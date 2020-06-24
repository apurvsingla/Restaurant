import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';



function RenderCommentsForSelectedDish({comments}){

    const cmnts = comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>&nbsp;{comment.comment}</p>
                <p>&nbsp;--{comment.author}, {dateFormat(comment.date,"mmmm dS, yyyy")}</p>
            </li>
        )
    })

    if (comments != null)
        return(
            
        <div className='col-12 col-md-5 m-1'>
            <Card>
                <CardTitle>
                    <h4> Comments </h4>
                </CardTitle>
                <CardText>
                    <ul className='list-unstyled'>
                        {cmnts}
                    </ul>
                </CardText>
            </Card>
        </div>
        
    );

    else
        return(
            <div></div>
        );
}

function RenderDish({dish}) {
    if (dish != null)
        return(
            <div className='col-12 col-md-5 m-1'>
            <Card key={dish.id}>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
            
        );
    else
        return(
            <div></div>
        );
}

const DishDetail = (props) => {
    let dish = props.dish
    if (dish == null) {
        return (<div></div>)
    }
    
    return (
        <div className='row'>
            <RenderDish dish={props.dish} />
            <RenderCommentsForSelectedDish comments={props.dish.comments} />
        </div>
    )
}



export default DishDetail;