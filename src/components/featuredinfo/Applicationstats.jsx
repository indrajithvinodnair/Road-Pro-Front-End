import React from "react"
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const CardStyling={
  width:"18rem",
  boxShadow: "rgba(100, 100, 111, 0.5) 0px 7px 29px 0px",
  position:"unset",
}

export default function Applicationstats() {


  return <div>
    <Card style={CardStyling}>
      <Card.Img variant="top" src="https://cdn.dribbble.com/users/1316503/screenshots/6521320/note_4x.png?compress=1&resize=1600x1200" />
      <Card.Body>
        <Card.Title>Applications</Card.Title>
        <Card.Text>
          Currently 10 applications are pending
        </Card.Text>
        <Link  to="/admin/usermanagement">
        <Button variant="primary">view all</Button>
        </Link>
      </Card.Body>
    </Card>

  </div>
}
