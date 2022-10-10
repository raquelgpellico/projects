import './Landing.css'
import { useNavigate } from 'react-router-dom'
export default function () {
    const navigate = useNavigate()

    return <div className='Landing'>

        <h1 className="intro" >Find your next read</h1>
        <p className="title"> Share your favorite books </p>
        <div >
            <button className="btt" onClick={() => navigate("/register")}>Register</button>

        </div>

        <p className="">Already have an account? Please <button className="btt" onClick={() => navigate("/login")}>Log in</button></p>
    </div>


}