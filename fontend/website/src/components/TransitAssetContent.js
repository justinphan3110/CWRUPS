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
import Button from '@material-ui/core/Button'

import TableBody from '@material-ui/core/TableBody'
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import AllOrders from './Popover/TransitAsset/AllOrders'
import NewTransit from './Modal/TransitAsset/NewTransit';

import axios from 'axios';

export default class TransitAssetContent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            assets: [],
            toggleRefreshAssets: false,
            assetsURL: 'http://127.0.0.1:8000/api/transit-assets/',
            newAssetModal: false

        }
    }

    assetList() {
        axios.get(this.state.assetsURL, {
            'headers': {
                'Authorization': sessionStorage.getItem('Authorization')
            }
        }).then((response) => {
            this.setState({
                assets: response.data
            })
        });
    }

    componentDidMount() {
        this.assetList()
    }

    refresh() {
        this.assetList();
    }

    tempControll(boo) {
        return boo ? 'YES' : 'NO'
    }

    newAssetVisible() {
        this.setState({
            newAssetModal: !this.state.newAssetModal,
        })
    }

    render() {
        let asset = this.state.assets.map((c) => {
            return (
                <TableRow key={(c.asset_id)}>
                    <TableCell>{c.asset_id}</TableCell>
                    <TableCell>{c.make}</TableCell>
                    <TableCell>{c.model}</TableCell>
                    <TableCell>{c.purchase_date}</TableCell>
                    <TableCell>{this.tempControll(c.temperature_controlled)}</TableCell>
                    <TableCell>
                        <AllOrders asset_id={c.asset_id} />
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
                                    <Button variant="contained" color="primary" onClick={this.newAssetVisible.bind(this)}>
                                        Add Transit Asset
                                     </Button>

                                    <NewTransit modalVisible={this.state.newAssetModal}
                                        newAssetVisible={this.newAssetVisible.bind(this)}
                                    />

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
                                        <TableCell>Make</TableCell>
                                        <TableCell>Model</TableCell>
                                        <TableCell>Purchase Date</TableCell>
                                        <TableCell>Temperature Control</TableCell>
                                        <TableCell>All Orders Using This Asset</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {asset}
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
