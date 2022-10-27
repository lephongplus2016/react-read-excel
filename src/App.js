import React, { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import * as XLSX from "xlsx";

function App() {
    const [users, setUsers] = useState([{ name: "sam" }]);
    const [isBusy, setIsBusy] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setIsBusy(true);
        const fakeData = [
            {
                name: "mike",
            },
            {
                name: "samurai",
            },
            {
                name: "jack",
            },
            {
                name: "ryu",
            },
        ];
        setTimeout(() => {
            setUsers([...users, ...fakeData]);
            setIsBusy(false);
        }, 3000);
    };

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            console.log(d);
        });
    };

    return (
        <div className="App m-4">
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                }}
            />

            <Loader isBusy={isBusy}></Loader>
            <ul className="list-group">
                {users.map((d) => (
                    <li className="list-group-item">{d.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
