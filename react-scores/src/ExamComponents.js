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

    const examCodes = exams.map(exam => exam.coursecode) ;

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
        <ExamForm courses={props.courses.filter(course => !examCodes.includes(course.coursecode))} addExam={addExam} />
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
    const [errorMessage, setErrorMessage] = useState() ;
    
    const handleAdd = (event) => {
        event.preventDefault() ;

        // MUST DO VALIDATION!!!!
        let valid = true ;
        if(course==='' || score==='' || date==='')
            valid = false ;
        const scorenumber = +score ;
        if(scorenumber<18 || scorenumber>30)
            valid = false ;
        // ADD MORE CHECKS....

        if(valid) {
            setErrorMessage('') 
            const exam = { coursecode: course, score: scorenumber, date: dayjs(date) } ;
            props.addExam(exam);
            setCourse('');
            setScore('');
            setDate('');
        } else {
            setErrorMessage('Error in the form...') ;
        }

    } ;

    return (
        <form>
        Exam: <select value={course} onChange={ev=>setCourse(ev.target.value)}>
            <option value='' disabled>Choose one...</option>
            {props.courses.map(course => <option key={course.coursecode} value={course.coursecode}>{course.name}</option>)}
            </select><br />
        Score: <input type='number' min={18} max={30} value={score} onChange={(event)=>{setScore(event.target.value)}} /><br />
        Date: <input type='date' value={date} onChange={ev=>setDate(ev.target.value)}/><br />
            <button onClick={handleAdd}>Add</button><br/>
            <span style={{color:'red'}}>{errorMessage}</span>
        </form>);
}

export { Title, ExamTable };