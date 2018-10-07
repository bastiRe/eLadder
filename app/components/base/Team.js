import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  team: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  player: {
    height: 20
  }
});

export default ({ team, align = 'left' }) => {
  const playerAlign = {
    textAlign: align === 'left' ? 'left' : 'right'
  };
  return (
    <View style={styles.team}>
      {team.map(p => (
        <Text key={p.name} style={[styles.player, playerAlign]}>
          {p.name}
        </Text>
      ))}
    </View>
  );
};
