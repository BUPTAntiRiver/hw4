import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Student from "./Student";
import { Pagination } from "react-bootstrap";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [active, setActive] = useState(1);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": "bid_0dc79fe52f6a30a5bfdd920f25f4b01da3803f43cce3d87dfb17406e23676d1a"
            }
        })
        .then((response) => response.json())
        .then((data) => {
           setStudents(data);
           console.log(data);
        }) 
    }, [])

    let filterStudents = students.filter((student) => {
        let flag = true;
        if (searchName && !(student.name.first + " " + student.name.last).toLowerCase().includes(searchName.toLowerCase())){
            flag = false;
        }
        if (searchMajor && !student.major.toLowerCase().includes(searchMajor.toLowerCase())){
            flag = false;
        }
        if (searchInterest && !student.interests.some((interest) => interest.toLowerCase().includes(searchInterest.toLowerCase()))){
            flag = false;
        }
        return flag;
    })

    let pageNum = Math.ceil(filterStudents.length / 24); 
    let pageItems = [];
    pageItems.push(
        <Pagination.Prev key={0} onClick={() => setActive(active - 1)} disabled={active === 1}>Previous</Pagination.Prev>
    )
    for(let i = 1; i <= pageNum; i++){
        pageItems.push(
            <Pagination.Item key={i} active={active === i} onClick={() => setActive(i)}>{i}</Pagination.Item>
        )
    }
    pageItems.push(
        <Pagination.Next key={pageNum + 1} onClick={() => setActive(active + 1)} disabled={active === pageNum}>Next</Pagination.Next>
    )

    let sliceStudents = filterStudents.slice((active - 1) * 24, active * 24);


    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor} onChange={(e) => setSearchMajor(e.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={searchInterest} onChange={(e) => setSearchInterest(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={() => {
                setSearchInterest("");
                setSearchMajor("");
                setSearchName("");
            }}>Reset Search</Button>
        </Form>
        <p>There are {filterStudents.length} student(s) matching your search.</p>
        <Container fluid>
            <Row>
                { /* TODO Students go here! */ }
                {
                    sliceStudents.map(student => 
                        <Col key={student.id} xs={12} sm={12} md={6} lg={4} xl={3}><Student {...student}></Student></Col>
                    )
                }
            </Row>
        </Container> 
        <Pagination>{pageItems}</Pagination>
    </div>

}

export default Classroom;