import React from 'react'
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti/'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import { Vote_Score } from '../../utils'
import '../../App.css'

const VoteScore = ({ computeVote, voteValue }) => {
    return (
        <Grid container spacing={0}>
            <Grid item>
                <Tooltip id="tooltip-detail" title="Like">
                    <IconButton aria-owns={null} aria-haspopup="false" aria-label="Like"
                        color="inherit" onClick={() => computeVote(Vote_Score.up)} >
                        <TiThumbsUp />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip id="tooltip-detail" title="Dislike">
                    <IconButton aria-owns={null} aria-haspopup="false" aria-label="Dislike"
                        color="inherit" onClick={() => computeVote(Vote_Score.down)} >
                        <TiThumbsDown />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item >
                <div className="voteScore">
                    {`Vote Score: ${voteValue}`}
                </div>
            </Grid>
        </Grid>
    )
}

VoteScore.propTypes = {
    voteValue: PropTypes.number.isRequired,
    computeVote: PropTypes.func.isRequired
}

export default VoteScore