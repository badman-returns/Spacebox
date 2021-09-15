import React, { useState, useRef } from 'react'
import { Button, Card, CardContent, Grid, TextField, CssBaseline } from '@material-ui/core';
import { PostJob } from '../../services/job.service';
import { useSelector } from "react-redux";
import SendIcon from '@material-ui/icons/Send';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddJobs = ({ handleJobRefresh }) => {


    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const descriptionRef = useRef();

    let { _id } = useSelector((state => state.userInfo.user));

    const handleSubmit = async () => {
        try {
            const data = {
                title: title,
                company: company,
                location: location,
                description: description,
                userId: _id,
            }
            const response = await PostJob(data);
            if (response.status === 200) {
                descriptionRef.current.value = '';
                setTitle('');
                setCompany('');
                setLocation('');
                setDescription('');
                handleJobRefresh();
                toast.success(response.data.ResponseMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <Grid container justifyContent='center' alignItems='center' >
            <CssBaseline />
            {/* <Grid item xl={9} lg={10}> */}
                <Card style={{ height: '92vh', overflow: 'auto' }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item lg={12}>
                                <TextField
                                    label="Job Title"
                                    variant="outlined"
                                    fullWidth
                                    value={title}
                                    onInput={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    label="Company"
                                    variant="outlined"
                                    fullWidth
                                    value={company}
                                    onInput={(e) => setCompany(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    label="Location"
                                    variant="outlined"
                                    fullWidth
                                    value={location}
                                    onInput={(e) => setLocation(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <ReactQuill ref={descriptionRef}
                                    value={description}
                                    onChange={(e) => setDescription(e)}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <Grid container justifyContent='center'>
                                    <Button variant='contained' color='primary' onClick={handleSubmit}>
                                        <SendIcon />
                                        Post Job
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            {/* </Grid> */}
        </Grid >
    )
}



export default AddJobs

