import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Row, Nav, Tab } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import { Export,Trash,FunnelSimple,ClockClockwise } from "@phosphor-icons/react";
import Swal from 'sweetalert2';
import { IMAGES } from '../../constant/theme';
import { gridDataBlog } from '../staff/GridData';






const holidayTable = [
    { id: 1, status: 'Closed', name: 'Garrett Winters', profile: IMAGES.smallpic1, education: 'B.A, B.C.A', mobile: '987 654 3210', email: 'info@example.com', join: '2020/07/25' },
    { id: 9, status: 'Pending', name: 'Airi Satou', profile: IMAGES.smallpic2, education: 'B.A, B.C.A', mobile: '987 654 3210', email: 'info@example.com', join: '2021/11/28' },
    { id: 10, status: 'Pending', name: 'Airi Satou', profile: IMAGES.smallpic2, education: 'B.A, B.C.A', mobile: '987 654 3210', email: 'info@example.com', join: '2021/11/28' },



];

const theadData = [
    { heading: 'Select', sortingVale: "Select" },
    { heading: 'Name', sortingVale: "name" },
    { heading: 'Interest', sortingVale: "Interest" },
    { heading: 'Mobile', sortingVale: "mobile" },
    { heading: 'Email', sortingVale: "email" },
    { heading: 'Lead Date', sortingVale: "join" },
    { heading: 'Status', sortingVale: "Status" },
    { heading: 'Action', sortingVale: "action" }
];


const Leadtrash = () => {
    const [sort, setSortata] = useState(10);
    const [data, setData] = useState(
        document.querySelectorAll('#holidayList tbody tr')
    )

    const activePag = useRef(0)
    const [test, settest] = useState(0)

    const chageData = (frist, sec) => {
        for (var i = 0; i < data.length; ++i) {
            if (i >= frist && i < sec) {
                data[i].classList.remove('d-none')
            } else {
                data[i].classList.add('d-none')
            }
        }
    }
    

    useEffect(() => {
        setData(document.querySelectorAll('#holidayList tbody tr'))
    }, [test])


    activePag.current === 0 && chageData(0, sort)

    let paggination = Array(Math.ceil(data.length / sort))
        .fill()
        .map((_, i) => i + 1)


    const onClick = (i) => {
        activePag.current = i
        chageData(activePag.current * sort, (activePag.current + 1) * sort)
        settest(i)
    }

    const [feeData, setFeeDate] = useState([...holidayTable]);
    const [iconData, setIconDate] = useState({ complete: false, ind: Number });

    const handlerestoreicon = () => {
      Swal.fire({
        title: 'Restore items',
        text: 'Do you want to restore these items? Theyll be moved back to their original location.',
        imageUrl:'../../../assets/images/restore.png',
        imageWidth: 64,
        imageHeight: 64,
        showCancelButton: true,
        confirmButtonText: 'Restore',
        cancelButtonText: 'Cancel',
        
        customClass: {
            title: 'my-title-class',
            text: 'my-text-class',
            confirmButton: 'my-confirm-button-class',
            cancelButton: 'my-cancel-button-class',
            popup: 'my-popup-class' ,
        }
        
    }).then((result) => {
        if (result.isConfirmed) {
            
            console.log('Restore action confirmed');
        } else if (result.isDismissed) {
           
            console.log('Action canceled');
        }
    });
    };

    const handledeleteicon = () => {
    Swal.fire({
        title: 'Delete Items',
        text: 'Are you sure you want to permanently delete these items? This action cannot be undone.',
        imageUrl: '../../../assets/images/restore.png',
        imageWidth: 64,
        imageHeight: 64,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            title: 'my-title-class',
            text: 'my-text-class',
            confirmButton: 'my-confirm-button-class-2',
            cancelButton: 'my-cancel-button-class-2',
            popup: 'my-popup-class',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            
            Swal.fire({
                title: 'Are You Sure?',
                text: 'Do you really want to permanently delete this ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                customClass: {
                    title: 'my-title-class',
                    text: 'my-text-class',
                    confirmButton: 'my-confirm-button-class-2',
                    cancelButton: 'my-cancel-button-class-2', popup: 'my-popup-class',
                }
            }).then((secondResult) => {
                if (secondResult.isConfirmed) {
                    
                    console.log('Final delete action confirmed');
                   
                } else {
                    console.log('Delete action canceled');
                }
            });
        } else {
            console.log('Initial action canceled');
        }
    });
}
  

    function SotingData(name) {
        const sortedPeople = [...feeData];
        switch (name) {
            case "rollno":
                sortedPeople.sort((a, b) => {
                    return a.rollno < b.rollno ? -1 : 1
                });
                break;
            case "name":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
                });
                break;
            case "education":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.education.localeCompare(b.education) : b.education.localeCompare(a.education)
                });
                break;
            case "mobile":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.mobile.localeCompare(b.mobile) : b.mobile.localeCompare(a.mobile)
                });
                break;
            case "join":
                sortedPeople.sort((a, b) => {
                    return iconData.complete ? a.join.localeCompare(b.join) : b.join.localeCompare(a.join)
                });
                break;
            default:
                break;
        }
        setFeeDate(sortedPeople);
    }
    function DataSearch(e) {
        const updatesDate = holidayTable.filter(item => {
            let selectdata = `${item.name} ${item.join} ${item.education} ${item.mobile}`.toLowerCase();
            return selectdata.includes(e.target.value.toLowerCase())
        });
        setFeeDate([...updatesDate])
    }
    
    

    return (
        <>

            <Row>
                <Tab.Container defaultActiveKey={"List"}>

                    <div className="col-lg-12">
                        <Tab.Content className="row tab-content">
                            <Tab.Pane eventKey="List" className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title" >Trash Files</h4>

                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div id='holidayList' className='dataTables_wrapper no-footer'>
                                                <div className='justify-content-between d-sm-flex'>
                                                    <div style={{display:"flex",flexWrap:"wrap",gap:"20px"}} className='dataTables_length'>
                                                        <div className='hover-pointer'>
                                                            <label className='d-flex align-items-center hover-pointer'>
                                                                Show
                                                                <Dropdown className='search-drop'>
                                                                    <Dropdown.Toggle as="div" className="search-drop-btn">
                                                                        {sort}
                                                                    </Dropdown.Toggle>
                                                                    <Dropdown.Menu>
                                                                        <Dropdown.Item onClick={() => setSortata('10')}>10</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => setSortata('20')}>20</Dropdown.Item>
                                                                        <Dropdown.Item onClick={() => setSortata('30')}>30</Dropdown.Item>
                                                                    </Dropdown.Menu>
                                                                </Dropdown>
                                                                entries
                                                            </label>
                                                        </div>

                                                       
                                                       <div className='hover-pointer' style={{border:"solid 01px #E6E6E6",padding:"7px",borderRadius:'5px'}}>
                                                             <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
                                                                 <FunnelSimple size={16} />
                                                                  <label htmlFor="">Filter</label>
                                                             </div>
                                                       </div>

                                                       <div className='hover-pointer' style={{border:"solid 01px #E6E6E6",padding:"7px",borderRadius:'5px'}}>
                                                             <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
                                                                 <Export size={16} />
                                                                 <label htmlFor="">Export</label>
                                                             </div>
                                                       </div>
                                                         
                                                         <div  className='hover-pointer' style={{border:"solid 01px #E6E6E6",padding:"7px",borderRadius:'5px'}}>
                                                             <div className='hover-pointer' style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
                                                                 <Trash size={16} />
                                                                 <label htmlFor="">Empty Trash</label>
                                                             </div>
                                                       </div>
                                                      

                                                       

                                                        

                                                    </div>


                                                    {/* <div style={{display:"flex",alignItems:'center',justifyContent:"center"}} className="dataTables_filter">
                                                         <button style={{padding:"8px",borderRadius:"5px",border:"none",backgroundColor:"#ffff", outline:"solid 1px black",opacity:"50px"}}> <span></span> Trash</button>
                                                    </div> */}


                                                    <div  className="dataTables_filter ">
                                                        <label>Search : <input type="search" className="" placeholder=""
                                                            onChange={DataSearch}
                                                        />
                                                        </label>
                                                    </div>
                                                </div>
                                                <table id="example4" className="display dataTable no-footer w-100" >
                                                    <thead>
                                                        <tr>
                                                            {theadData.map((item, ind) => (
                                                                <th key={ind}
                                                                    onClick={() => { SotingData(item.sortingVale); setIconDate(prevState => ({ complete: !prevState.complete, ind: ind })) }}
                                                                >{item.heading}
                                                                    <span>
                                                                        {ind !== iconData.ind &&
                                                                            <i className="fa fa-sort ms-2 fs-12" style={{ opacity: '0.3' }} />
                                                                        }
                                                                        {ind === iconData.ind && (
                                                                            iconData.complete ?
                                                                                <i className="fa fa-arrow-down ms-2 fs-12" style={{ opacity: '0.7' }} />
                                                                                :
                                                                                <i className="fa fa-arrow-up ms-2 fs-12" style={{ opacity: '0.7' }} />
                                                                        )
                                                                        }
                                                                    </span>
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {feeData.map((data, ind) => (
                                                            <tr key={ind}>
                                                                <td><input style={{ height: "15px", width: "15px" }} type="checkbox" /> </td>

                                                                <td>{data.name}</td>
                                                                <td>{data.education}</td>
                                                                <td><Link to={"#"}><strong>{data.mobile}</strong></Link></td>
                                                                <td><Link to={"#"}><strong>{data.email}</strong></Link></td>
                                                                <td>{data.join}</td>
                                                                <td><strong>{data.status}</strong></td>
                                                                <td>
                                                                    <Link to={"#"} className="btn btn-xs sharp btn-primary me-1"><ClockClockwise size={16} weight="bold" onClick={handlerestoreicon} /></Link>
                                                                    <Link to={"#"} className="btn btn-xs sharp btn-danger"><i onClick={handledeleteicon} className="fa fa-trash" /></Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div className='d-sm-flex text-center justify-content-between align-items-center mt-3'>
                                                    <div className='dataTables_info'>
                                                        Showing {activePag.current * sort + 1} to{' '}
                                                        {data.length > (activePag.current + 1) * sort
                                                            ? (activePag.current + 1) * sort
                                                            : data.length}{' '}
                                                        of {data.length} entries
                                                    </div>

                                                    <div
                                                        className='dataTables_paginate paging_simple_numbers'
                                                        id='example5_paginate'
                                                    >
                                                        <Link
                                                            className='paginate_button previous disabled'
                                                            to='#'
                                                            onClick={() =>
                                                                activePag.current > 0 && onClick(activePag.current - 1)
                                                            }
                                                        >
                                                            Previous
                                                        </Link>
                                                        <span>
                                                            {paggination.map((number, i) => (
                                                                <Link
                                                                    key={i}
                                                                    to='#'
                                                                    className={`paginate_button  ${activePag.current === i ? 'current' : ''
                                                                        } `}
                                                                    onClick={() => onClick(i)}
                                                                >
                                                                    {number}
                                                                </Link>
                                                            ))}
                                                        </span>
                                                        <Link
                                                            className='paginate_button next'
                                                            to='#'
                                                            onClick={() =>
                                                                activePag.current + 1 < paggination.length &&
                                                                onClick(activePag.current + 1)
                                                            }
                                                        >
                                                            Next
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Grid" className="col-lg-12">
                                <div className="row">
                                    {gridDataBlog.map((item, ind) => (
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={ind}>
                                            <div className="card card-profile">
                                                <div className="card-header justify-content-end pb-0 border-0">
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="button" className="btn btn-link i-false" type="button">
                                                            <span className="dropdown-dots fs--1"></span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu align="end" className="dropdown-menu dropdown-menu-right border py-0">
                                                            <div className="py-2">
                                                                <Link to={"#"} className="dropdown-item">Edit</Link>
                                                                <Link to={"#"} className="dropdown-item text-danger">Delete</Link>
                                                            </div>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className="card-body pt-2">
                                                    <div className="text-center">
                                                        <div className="profile-photo">
                                                            <img src={item.image} width="100" className="img-fluid rounded-circle" alt="" />
                                                        </div>
                                                        <h3 className="mt-4 mb-1">{item.name}</h3>
                                                        <p className="text-muted">{item.subject}</p>
                                                        <ul className="list-group mb-3 list-group-flush">
                                                            {item.content.map((data, ind) => (
                                                                <li className="list-group-item px-0 d-flex justify-content-between" key={ind}>
                                                                    <span className="mb-0">{data.title} :</span><strong>{data.subtitle}</strong>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <Link to={"/about-student"} className="btn btn-outline-primary btn-rounded mt-3 px-4">Read More</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </Tab.Container>
            </Row>
        </>
    );
};

export default Leadtrash;