import React, { useState, useEffect } from 'react';
import './style.css';  // Import the CSS for custom styles, if necessary
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { getAllCmp } from '../Services/allApis';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({ trigger }) => {
    // States to store counts of different statuses
    const [pendingCount, setPendingCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        getAllCount()
    }, [trigger]);

    const getAllCount = async () => {
        const result = await getAllCmp("")
        setPendingCount(result.data.pending.length);
        setInProgressCount(result.data.progress.length);
        setCompletedCount(result.data.completed.length);
    };
    const handleLogout = () => {
        localStorage.setItem("existingUser",null);
        navigate("/")
      }


    return (
        <div className="dashboard-container">
            <div className='p-2 d-flex justify-content-end'>
            <button className='btn d-flex bg-success' onClick={handleLogout}> <h5>Logout</h5><i class="fa-solid fa-right-from-bracket text-white ms-2"></i></button>
            </div>

            <div className="row">
                {/* Pending Box */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <Link to='/pending' style={{ textDecoration: 'none' }}>
                        <Card className="status-card">
                            <Card.Body>
                                <h5 className="status-title">PENDING</h5>
                                <p className="status-count">{pendingCount}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>

                {/* In Progress Box */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <Link to='/progress' style={{ textDecoration: 'none' }}>
                        <Card className="status-card">
                            <Card.Body>
                                <h5 className="status-title">IN PROGRESS</h5>
                                <p className="status-count">{inProgressCount}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>

                {/* Completed Box */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <Link to='/completed' style={{ textDecoration: 'none' }}>
                        <Card className="status-card">
                            <Card.Body>
                                <h5 className="status-title">COMPLETED</h5>
                                <p className="status-count">{completedCount}</p>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
