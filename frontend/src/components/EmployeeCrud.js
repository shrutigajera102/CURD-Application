import axios from "axios";
import { useEffect, useState } from "react";
import './EmployeeCrud.css';

function EmployeeCrud() {

    const [_id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [employees, setUser] = useState([]);

    useEffect(() => {
        Load();
    }, []);

    async function Load() {
        const result = await axios.get("http://localhost:8000/user/getAll");
        setUser(result.data.data);
        console.log(result.data);
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8000/user/create", {
                name: name,
                address: address,
                phone: phone,
                username: username,
                password: password,
                email: email
            });
            alert("Employee Registation Successfully");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            setUsername("");
            setPassword("");
            setEmail("");
            Load();
        } catch (err) {
            alert("User Registation Failed");
        }
    }
    async function editEmployee(employees) {
        setName(employees.name);
        setAddress(employees.address);
        setMobile(employees.phone);
        setUsername(employees.username);
        setPassword(employees.password);
        setEmail(employees.email);
        setId(employees._id)
    }

    async function DeleteEmployee(_id) {
        await axios.delete("http://localhost:8000/user/delete/" + _id);
        alert("Employee deleted Successfully");
        Load();
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch("http://localhost:8000/user/update/" + employees.find((u) => u._id === _id)._id || _id,
                {
                    _id: _id,
                    name: name,
                    address: address,
                    phone: phone,
                    username: username,
                });
            alert("Data Updated");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            setUsername("")
            Load();
        } catch (err) {
            alert(err);
        }
    }

    return (

        <>

            <div>
                <div className="main1">
                    {/* <!-- Button trigger modal --> */}
                    <h1 style={{ marginBottom:"40px"}}>CRUD-Application</h1>
                    <button type="button" class="btn2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Details
                    </button>

                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel" style={{marginLeft:"160px"}}>CRUD-Application</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form className="form" style={{marginLeft:"50px"}}>
                                        <div>
                                            <input type="text" class="form-control " hidden value={_id} onChange={(event) => { setId(event.target.value); }} />
                                            <label className="font">Name</label>
                                            <input type="text" class="form-control" id="name" value={name} onChange={(event) => { setName(event.target.value); }} />
                                        </div>
                                        <div>
                                            <label className="font">Addrees</label>
                                            <input type="text" class="form-control" id="address" value={address} onChange={(event) => { setAddress(event.target.value); }} />
                                        </div>
                                        <div>
                                            <label className="font">Mobile</label>
                                            <input type="text" class="form-control" id="mobile" value={phone} onChange={(event) => { setMobile(event.target.value); }} />
                                        </div>
                                        <div>
                                            <label className="font">Username</label>
                                            <input type="text" class="form-control" id="username" value={username} onChange={(event) => { setUsername(event.target.value); }} />
                                        </div>
                                        <div>
                                            <label className="font">Password</label>
                                            <input type="password" class="form-control" id="password" value={password} onChange={(event) => { setPassword(event.target.value); }} />
                                        </div>
                                        <div>
                                            <label className="font">email</label>
                                            <input type="text" class="form-control" id="email" value={email} onChange={(event) => { setEmail(event.target.value); }} />
                                        </div>
                                        <div class="btn1">
                                            <button class="btn btn-primary mt-4  " onClick={save}>Register</button>
                                            <button class="btn btn-secondary mt-4" onClick={update}>Update</button>
                                        </div>
                                    </form>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    {/* end  */}


                </div>
                <hr /><br /><br />
                <h1 style={{textAlign:"center", marginBottom:"50px"}}>Student Records</h1>
                <table class="table table-striped" style={{ width: "90%", margin: "auto 5%", marginBottom:"20px" }}>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Adrees</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col">email</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    {employees.map(function fn(employee) {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">{employee._id}</th>
                                    <td>{employee.name}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.username}</td>
                                    <td>{employee.password}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        <i class="fa-solid fa-pen-to-square"  data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ color: 'blue', fontSize: "1rem", marginLeft: "10px" }}
                                            onClick={() => editEmployee(employee)}
                                        ></i>
                                        &nbsp;&nbsp;
                                        <i class="fa-solid fa-trash-can" style={{ color: 'grey', fontSize: "1rem", marginLeft: "10px" }}
                                            onClick={() => DeleteEmployee(employee._id)}
                                        ></i>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
        </>
    );
}

export default EmployeeCrud;