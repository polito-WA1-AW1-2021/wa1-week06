import { useContext, useState } from 'react';
import { Col, Table } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons'

import { PrivacyMode, EditMode } from './createContexts';

function Title(props) {
    return (<Col>
        <h1>Your Exams</h1>
    </Col>)
}

function ExamTable(props) {

    const [exams, setExams] = useState(props.exams);

    const deleteExam = (code) => {
        setExams(oldExams => oldExams.filter(exam => exam.coursecode !== code));
    }

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
            {exams.map((exam => <ExamRow key={exam.coursecode} exam={exam}
                examName={props.courses.filter(c => c.coursecode === exam.coursecode)[0].name}
                deleteExam={deleteExam}
            />))}
        </tbody>
    </Table>
    );
}

function ExamRow(props) {
    return (<tr>
        <ExamInfo {...props} />
        <EditMode.Consumer>
            {editable => editable ? <ExamControls exam={props.exam} deleteExam={props.deleteExam} /> : <td><i>disabled</i></td>}
        </EditMode.Consumer>
    </tr>
    );
}

function ExamInfo(props) {
    let privacyMode = useContext(PrivacyMode)
    return (<>
        <td>{props.examName}</td>
        <td>{privacyMode ? "X" : props.exam.score}</td>
        <td>{privacyMode ? "X" : props.exam.date.format('DD MMM YYYY')}</td>
    </>)
}

function ExamControls(props) {
    return <td>{iconEdit} <span onClick={() => props.deleteExam(props.exam.coursecode)}>{iconDelete}</span></td>;
}

export { Title, ExamTable };