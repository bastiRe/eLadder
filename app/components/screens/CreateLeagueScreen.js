import React from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { graphql, compose } from "react-apollo";
import { Amplitude } from "expo";
import gql from "graphql-tag";
import ADD_LEAGUE_ID from "../../graphql/AddLeagueId";
import CreateLeagueForm from "../base/CreateLeagueForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    elevation: 0
  }
});

class CreateLeagueScreen extends React.Component {
  static navigationOptions = {
    title: "Create League",
    headerStyle: styles.header
  };

  state = {
    loading: false
  };

  _createLeague = async ({ title }) => {
    this.setState({ loading: true });
    try {
      const result = await this.props.createLeagueMutation({
        variables: {
          title
        }
      });
      const leagueId = result.data.createLeague.league.id;
      await this.props.addLeagueIdMutation({ variables: { leagueId } });
      Amplitude.logEventWithProperties("CreateLeague", { leagueId });
    } catch (e) {
      Alert.alert(e.message.replace("GraphQL error: ", ""));
    }
    this.setState({ loading: false });
    this.props.navigation.goBack();
  };

  render() {
    let content;
    if (this.state.loading) {
      content = <ActivityIndicator />;
    } else {
      content = (
        <CreateLeagueForm onSubmit={values => this._createLeague(values)} />
      );
    }
    return <View style={styles.container}>{content}</View>;
  }
}

const CREATE_LEAGUE = gql`
  mutation CreateLeague($title: String!) {
    createLeague(title: $title) {
      league {
        id
      }
    }
  }
`;

export default compose(
  graphql(CREATE_LEAGUE, { name: "createLeagueMutation" }),
  graphql(ADD_LEAGUE_ID, { name: "addLeagueIdMutation" })
)(CreateLeagueScreen);
