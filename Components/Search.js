import React from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false
    };
    this.searchedText = "";
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
        this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        this.setState({
          films: data.results,
          isLoading: false
        });
      });
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
        
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      );
    }
  }

  render() {
    console.log(this.state.isLoading);
    return (
      <View style={styles.main_container}>
        <TextInput
          onChangeText={text => this._searchTextInputChanged(text)}
          style={styles.textinput}
          placeholder="Titre du film"
          onSubmitEditing={() => this._loadFilms()}
        />
        <Button title="Rechercher" onPress={() => this._loadFilms()} />
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FilmItem film={item} />}
        />
         { this.state.isLoading ?
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
          : null
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 50,
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Search;
