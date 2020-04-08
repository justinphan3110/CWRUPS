import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import axios from 'axios';

import AllOrdersFrom from './Popover/DistributionCenter/AllOrdersFrom'

export default class DistributionCenterContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            centers: [],
            toggleRefreshCenters: false,
            centersURL: 'http://127.0.0.1:8000/api/distribution-center/details/',

        }
    }

    centerList() {
        axios.get(this.state.centersURL, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).then((response) => {
            this.setState({
                centers: response.data
            })
            console.log(this.state.centers);
        });
    }

    componentDidMount() {
        this.centerList();
    }

    refresh() {
        this.centerList();
    }

    address(ad) {
        return ad.house_number + ' ' + ad.street_name + ' '
            + (ad.apt_number === null ? '' : ad.apt_number) + ' '
            + ad.city + ' ' + ad.state + ' ' + ad.zip_code;
    }

    render() {
        let center = this.state.centers.map((c) => {
            return (
                <TableRow key={(c.distribution_center_id)}>
                    <TableCell>{(c.distribution_center_id)}</TableCell>
                    <TableCell>{(c.description)}</TableCell>
                    <TableCell>{this.address(c.address)}</TableCell>
                    <TableCell>
                        <AllOrdersFrom
                            distribution_center_id={c.distribution_center_id} />
                    </TableCell>
                </TableRow>
            )
        });
        return (
            <React.Fragment>
                <Paper>

                    <AppBar position="static" color="default" elevation={2}>
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Tooltip title="Reload">
                                        <IconButton onClick={this.refresh.bind(this)}>
                                            <RefreshIcon className={this.state.classesblock} color="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    {/* <div className={this.state.classescontentWrapper}> */}
                    <div>
                        <Typography>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow key={'table-title'}>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>All Orders At This Center</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {center}
                                </TableBody>

                            </Table>
                        </Typography>
                        {/* </div> */}
                    </div>
                </Paper>

            </React.Fragment>
        )
    }
}
