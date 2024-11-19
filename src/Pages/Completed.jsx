import React, { useState } from 'react';
import Dashboard from '../Components/Dashboard';
import './style.css';
import { useEffect } from 'react';
import { getAllCmp, statusChange } from '../Services/allApis';
import { Popover, OverlayTrigger } from 'react-bootstrap';


function Completed() {

    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dashboardTrigger,setTrigger]= useState(false)


    useEffect(() => {
        getAllCount()
    }, [searchQuery,dashboardTrigger]);

    const getAllCount = async () => {
        const result = await getAllCmp(searchQuery)
        setData(result.data.completed)
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); // Update search query
    };
    // Function to handle the status change
    const handleStatusChange = async (id, newStatus) => {
        const updatedData = data.map((row) => {
            if (row.cmpId === id) {
                return { ...row, status: newStatus };
            }
            return row;
        });
        const newData = {
            cmpId: id,
            status: newStatus
        }
        const result = await statusChange(newData)
        if (result.status === 200) {
             setData(updatedData);
             setTrigger(!dashboardTrigger)
            alert("Status Updated")
        }
        else {
            alert("Something went wrong")
        }
    };

    // Function to toggle the selected row
    const handleRowClick = (id) => {
        setSelectedRow(selectedRow === id ? null : id); // Toggle the selected row
    };
    // State for managing the visibility of the popover
    const [showPopover, setShowPopover] = useState(false);

    const nameFilter = async () => {
        console.log("Inside nameFilter");

        // Create a new sorted array, do not mutate the original data
        const sortedData = [...data].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1; // a comes before b
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1; // a comes after b
            }
            return 0; // a and b are equal
        });

        console.log("Sorted Data: ", sortedData);

        setData(sortedData); // Update the state with the sorted data
        handleTogglePopover()
    };
    const dateFilter = async () => {
        console.log("Inside dateFilter");

        // Create a new sorted array, do not mutate the original data
        const sortedData = [...data].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return dateB - dateA; // Sort in ascending order
        });

        console.log("Sorted by Date: ", sortedData);

        setData(sortedData); // Update the state with the sorted data
        handleTogglePopover()
    };


    // Toggle the popover visibility
    const handleTogglePopover = () => setShowPopover(!showPopover);

    // Popover component
    const popover = (
        <Popover id="popover-basic" className="filter-popover">
            <Popover.Body>
                <ul>
                    <li onClick={dateFilter}>Date</li>
                    <li onClick={nameFilter}>Name</li>
                </ul>
            </Popover.Body>
        </Popover>
    );


    return (
        <div>
            <Dashboard trigger={dashboardTrigger} />
            <div className='text-white d-flex justify-content-between p-3 m-5 bg-transparent custom-border'>
                <h1>Completed Complaints</h1>
                <div className='d-flex'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="form-control border-rounded me-3"
                        style={{
                            maxWidth: '250px',
                            borderRadius: '30px',
                            paddingLeft: '10px',
                        }}
                    />
                    {/* OverlayTrigger to show the popover when the icon is clicked */}
                    <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        overlay={popover}
                        show={showPopover}
                        onToggle={handleTogglePopover} // Toggle popover on icon click
                    >
                        <i
                            className="fa-solid fa-arrow-down-wide-short d-flex fs-4 align-items-center"
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </OverlayTrigger>
                </div>
            </div>

            {/* Table for displaying complaints */}
            {data.length > 0 ?

                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Complaint</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <React.Fragment key={row.cmpId}>
                                    {/* Table row with clickable functionality */}
                                    <tr >
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{new Date(row.createdAt).toLocaleString()}</td>
                                        <td onClick={() => handleRowClick(row.cmpId)} style={{ cursor: 'pointer' }}>{row.complaint.length > 1 ? row.complaint.substring(0, 29) + '...' : row.complaint}</td>

                                        {/* Dropdown for changing status */}
                                        <td>
                                            <select
                                                value={row.status}
                                                onChange={(e) => handleStatusChange(row.cmpId, e.target.value)} // Handle status change
                                                className={`form-control ${row.status.toLowerCase()}`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="InProgress">InProgress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </td>
                                    </tr>

                                    {/* Show the details when the row is selected */}
                                    {selectedRow === row.cmpId && (
                                        <tr>
                                            <td colSpan="4">
                                                <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderTop: '1px solid #ddd' }}>
                                                    <strong>Complaint Details:</strong> {row.complaint}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                :
                <div className='d-flex justify-content-center  text-white'>
                    <h4>No Complaints complaints...</h4>
                </div>
            }

        </div>
    );
}

export default Completed;
