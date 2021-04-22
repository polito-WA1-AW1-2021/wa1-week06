import dayjs from 'dayjs';
import { useState } from 'react';
import { Col, Table } from 'react-bootstrap';
import { iconDelete, iconEdit } from './icons'

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

    const addExam = (newExam) => {
        // exams.push(exam) ; NOOO
        setExams( oldExams => [...oldExams, newExam]);
    } ;

    return (<>
        <Table striped bordered>
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
        <ExamForm courses={props.courses} addExam={addExam} />
    </>
    );
}

function ExamRow(props) {
    return (<tr>
        <ExamInfo {...props} />
        <ExamControls exam={props.exam} deleteExam={props.deleteExam} />
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
    return <td>{iconEdit} <span onClick={() => props.deleteExam(props.exam.coursecode)}>{iconDelete}</span></td>;
}

function ExamForm(props) {
    const [course, setCourse] = useState('') ;  // props.courses[0].coursecode
    const [score, setScore] = useState('') ;
    const [date, setDate] = useState('') ;

    const handleAdd = (event) => {
        event.preventDefault() ;

        const exam = { coursecode: course, score: score, date: dayjs(date) } ;
        // MUST DO VALIDATION!!!!
        props.addExam(exam);

    } ;

    return (
        <form>
        Exam: <select value={course} onChange={ev=>setCourse(ev.target.value)}>
            <option value='' disabled>Choose one...</option>
            {props.courses.map(course => <option key={course.coursecode} value={course.coursecode}>{course.name}</option>)}
            </select><br />
        Score: <input type='text' value={score} onChange={(event)=>{setScore(event.target.value)}} /><br />
        Date: <input type='date' value={date} onChange={ev=>setDate(ev.target.value)}/><br />
            <button onClick={handleAdd}>Add</button>
        </form>);
}

export { Title, ExamTable };