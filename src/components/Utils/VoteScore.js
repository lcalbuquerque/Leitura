import React from 'react'
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti/'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { CONSTS } from '../../utils'

const styles = {
  voteScore: {
    paddingTop: 14,
    paddingLeft: 5
  }
}

const VoteScore = ({voteFunc, voteValue, classes}) => {
  return (
    <Grid container spacing={0}>
      <Grid item>
        <Tooltip id="tooltip-detail" title="Like">
          <IconButton
          aria-owns={null}
          aria-haspopup="false"
          aria-label="Like"
          color="inherit"
          onClick={() => voteFunc(CONSTS.VOTE_SCORE.OPTIONS.UP)}
          >
                      <TiThumbsUp/>
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip id="tooltip-detail" title="Dislike">
          <IconButton
          aria-owns={null}
          aria-haspopup="false"
          aria-label="Dislike"
          color="inherit"
          onClick={() => voteFunc(CONSTS.VOTE_SCORE.OPTIONS.DOWN)}
          >
                      <TiThumbsDown/>
          </IconButton>
        </Tooltip>
      </Grid>
     <Grid item className={classes.voteScore}>
        <Typography color="textSecondary">
          {`Vote Score: ${voteValue}`}
        </Typography>
      </Grid>
    </Grid>
  )
}

VoteScore.propTypes = {
  voteValue: PropTypes.number.isRequired,
  voteFunc: PropTypes.func.isRequired
}

export default withStyles(styles)(VoteScore)