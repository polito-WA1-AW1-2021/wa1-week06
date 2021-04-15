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
            {props.exams.map((exam => <ExamRow key={exam.coursecode} exam={exam} 
            examName={props.courses.filter(c=>c.coursecode === exam.coursecode)[0].name}
             />))}
        </tbody>
    </Table>
    );
}

function ExamRow(props) {
    return (<tr>
        <ExamInfo {...props} />
        <ExamControls/>
    </tr>
    );
}

function ExamInfo(props) {
    return (<>
        <td>{props.examName}</td>
        <td>{props.exam.score}</td>
        <td>{props.exam.date.format('DD MMM YYYY')}</td>
    </>)
}

function ExamControls(props) {
    return <td>{iconEdit} {iconDelete}</td> ;
}

export { Title, ExamTable };