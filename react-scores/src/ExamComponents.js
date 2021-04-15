import { Col, Table } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons'

function Title(props) {
    return (<Col>
        <h1>Your Exams</h1>
    </Col>)
}

function ExamTable(props) {
    return (<Table striped bordered>
        <thead>
            <tr>
                <th>Exam</th>
                <th>Score</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <ExamRow />
            <ExamRow />
            <ExamRow />
            <ExamRow />
        </tbody>
    </Table>
    );
}

function ExamRow(props) {
    return (<tr>
        <ExamInfo/>
        <ExamControls/>
    </tr>
    );
}

function ExamInfo(props) {
    return (<>
        <td>Information systems security</td>
        <td>28</td>
        <td>01/03/2021</td>
    </>)
}

function ExamControls(props) {
    return <td>{iconEdit} {iconDelete}</td> ;
}

export { Title, ExamTable };