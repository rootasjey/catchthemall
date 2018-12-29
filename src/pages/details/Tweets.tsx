import React, { Component } from "react";
import { observer }         from "mobx-react";
import { store }            from "../../store";

import { Grow }             from '@material-ui/core';
import styled               from "styled-components";
import TwitterSVGColor      from '../../assets/TwitterLogoColor.svg';

import {
  Card,
  CardActions,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';

import {
  Theme,
  StyleRulesCallback,
  withStyles,
} from '@material-ui/core/styles';

const styles: StyleRulesCallback = (theme: Theme) => ({
  avatar: {
    backgroundColor: '#0984e3'
  },
  card: {
    maxWidth: 275,
    margin: '10px',
  },
  media: {
    height: 140,
  },
});

@observer
class Tweets extends Component<{ classes: any }, {}> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    const { name } = store.selectedPokemon;

    if (name.length > 0) {
      store.fetchTweets(name);
      store.startTweetStream(name);
    }
  }

  componentWillUnmount(){
    store.stopTweetStream();
  }

  render() {
    const classes = this.props.classes;
    const tweetsArray = store.tweets.map((tweet, index) =>
      <Card
        key={index}
        className={classes.card}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="avatar" className={classes.avatar}>
              { tweet.user.name.charAt(0) }
            </Avatar>
          }

          title={`${tweet.user.name}`}
          subheader={`@${tweet.user.screen_name}`}
        />

        <CardMedia
          className={classes.media}
          image={TwitterSVGColor}
        />

        <CardContent>
          <Typography component="p">
            {tweet.text}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small"
            onClick={() => { window.open(`https://twitter.com/statuses/${tweet.id_str}`) }}
          >
            View on Twitter
          </Button>
        </CardActions>
      </Card>
    );

    return (
      <StyledContainer>
        { tweetsArray }
      </StyledContainer>
    )
  }
}

export default withStyles(styles)(Tweets);

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: scroll;

  padding-bottom: 50px;
`;