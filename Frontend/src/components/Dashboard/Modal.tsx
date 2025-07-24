import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Papa from 'papaparse'
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [file, setFile] = useState<File | null>(null)

    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] || null);
    }

    const uploadCV = async () => {
        if (!file) alert("Please select a file")

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results: any) => {
                try {
                    const response = await axios.post("http://localhost:5500/api/v1/employees/upload-csv",
                        { employees: results.data },
                        { headers: { 'Content-Type': 'application/json' } }
                    )
                    alert("Upload completed")
                    console.log(response)
                } catch (error) {
                    alert("upload failed")
                }
            }
        })
    }

    return (
        <div>
            <button
                className="bg-btn py-2 px-4 rounded-xl text-white font-semibold hover:bg-btn/90 transition"
                onClick={handleOpen}
            >
                Bulk Upload CSV
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="bg-white w-[90vw] max-w-md p-6 rounded-2xl shadow-2xl">
                        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Upload Bulk Employee Data</h2>
                        <p className="text-sm text-gray-600 text-center mb-6">Please upload only .csv files</p>

                        <form onSubmit={uploadCV}>
                            <input
                                type="file"
                                accept=".csv"
                                required
                                onChange={handleFileChange}
                                className="w-full bg-[#C7D1FE] rounded-xl p-3 text-sm font-semibold cursor-pointer transition hover:bg-[#b5c5fc]"
                            />
                            <button
                                className="text-sm flex justify-start mt-6 font-medium text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                                type='submit'
                            >
                                Upload File
                            </button>
                        </form>
                        {/* <div className="flex justify-end mt-6">
                            <button
                                onClick={handleClose}
                                className="text-sm font-medium text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                            >
                                Close
                            </button>
                        </div> */}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
