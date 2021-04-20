import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ExamTable, Title } from './ExamComponents';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { PrivacyMode, EditMode } from './createContexts';

const fakeExams = [
  { coursecode: '01TYMOV', score: 28, date: dayjs('2021-03-01') },
  { coursecode: '01SQJOV', score: 29, date: dayjs('2021-06-03') },
  { coursecode: '04GSPOV', score: 27, date: dayjs('2021-05-24') },
  { coursecode: '01TXYOV', score: 24, date: dayjs('2021-06-21') },
];

const fakeCourses = [
  { coursecode: '01TYMOV', name: 'Information systems security' },
  { coursecode: '02LSEOV', name: 'Computer architectures' },
  { coursecode: '01SQJOV', name: 'Data Science and Database Technology' },
  { coursecode: '01OTWOV', name: 'Computer network technologies and services' },
  { coursecode: '04GSPOV', name: 'Software Engineering' },
  { coursecode: '01TXYOV', name: 'Web Applications I' },
  { coursecode: '01NYHOV', name: 'System and device programming' },
  { coursecode: '01TYDOV', name: 'Cloud Computing' },
  { coursecode: '01SQPOV', name: 'Software Networking' },
];

function App() {
  const [privacy, setPrivacy] = useState(true);
  const [editable, setEditable] = useState(false);

  return (
    <Container className="App">
      <Row>
        <Title />
        <Col align='right'>
          <Button variant='secondary' onClick={() => setPrivacy(p => !p)}>{privacy ? 'View' : 'Hide'}</Button>&nbsp;
          <Button variant='secondary' onClick={() => setEditable(p => !p)}>{editable ? 'Read' : 'Edit'}</Button>
        </Col>
      </Row>
      <Row>
        <PrivacyMode.Provider value={privacy}>
          <EditMode.Provider value={editable}>
            <ExamTable courses={fakeCourses} exams={fakeExams} />
          </EditMode.Provider>
        </PrivacyMode.Provider>
      </Row>
    </Container>
  );
}

export default App;
