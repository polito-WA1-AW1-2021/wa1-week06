import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import { ExamTable, Title } from './ExamComponents';

function App() {
  return (
    <Container className="App">
      <Row>
        <Title/>
      </Row>
      <Row>
        <ExamTable/>
      </Row>
    </Container>
  );
}

export default App;
