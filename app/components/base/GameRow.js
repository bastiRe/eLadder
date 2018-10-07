import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert
} from 'react-native';
import Team from './Team';
import { Mutation } from 'react-apollo';
import LEAGUE from '../../graphql/League';
import DELETE_GAME from '../../graphql/DeleteGame';
import * as Colors from '../../constants/Colors';

const GameRow = ({ id, teams, points, leagueId }) => {
  return (
    <Mutation
      mutation={DELETE_GAME}
      refetchQueries={[{ query: LEAGUE, variables: { leagueId } }]}
    >
      {(deleteGame, { data, loading }) => {
        const onLongPress = () =>
          Alert.alert(
            'Delete Game?',
            'Do you really want to delete the game?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: () => deleteGame({ variables: { id } }) }
            ]
          );
        return (
          <TouchableHighlight onLongPress={onLongPress}>
            <View style={styles.container}>
              <Text style={styles.points}>
                {points >= 0 ? '+' : '-'}
                {Math.abs(points)}
              </Text>
              <Team team={teams[0].players} />
              <View style={styles.score}>
                <Text style={styles.scoreText}>
                  {' '}
                  {teams[0].score}:{teams[1].score}{' '}
                </Text>
              </View>
              <Team team={teams[1].players} align="right" />
              <Text style={styles.points}>
                {points <= 0 ? '+' : '-'}
                {Math.abs(points)}
              </Text>
            </View>
          </TouchableHighlight>
        );
      }}
    </Mutation>
  );
};

export default GameRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    borderBottomWidth: 1,
    borderColor: Colors.Border,
    backgroundColor: 'white'
  },
  score: {
    width: 40
  },
  scoreText: {
    textAlign: 'center'
  },
  points: {
    textAlign: 'center',
    height: 20,
    width: 50,
    color: Colors.Secondary
  }
});
