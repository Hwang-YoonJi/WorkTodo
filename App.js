import React from 'react';
import { StyleSheet, FlatList, SafeAreaView,AsyncStorage } from 'react-native';
import Header from './components/Header'
import TodoItem from './components/TodoItem'
import TaskModal from './components/TaskModal'

export default class App extends React.Component {
  componentDidMount() {
    AsyncStorage.getItem('@todo:state').then((state) => {
      this.setState(JSON.parse(state))
    })
  }

  state = {
    todos: [
      {
        title: "일기쓰기",
        done: true,
      },
      {
        title: "스터디 준비하기",
        done: false,
      },
    ],
    showModal: false,
  }

  save = () => {
    AsyncStorage.setItem('@todo:state', JSON.stringify(this.state))
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          show={() => {
            this.setState({ showModal: true})
          }}
        />
        <FlatList
          data={this.state.todos}
          renderItem={({ item, index }) => {
            return (
              <TodoItem
                title={item.title}
                done={item.done}
                keyExtractor={(id, index) => {
                  return id + '${index}'
                }}
                remove={() => {
                  this.setState({
                    todos: this.state.todos.filter((_, i) => i !== index)
                  }, this.save)
                }}
                toggle={() => {
                  const newTodos = [...this.state.todos]
                  newTodos[index].done = !newTodos[index].done
                  this.setState({todos: newTodos}, this.save)
                }}
              />
            )
          }}
        />
        <TaskModal 
          isVisible={this.state.showModal}
          add={(title) => {
            this.setState({
              todos: this.state.todos.concat({
                title: title,
                done: false,
              }),
              showModal: false,
            }, this.save)
          }}
          hide={() => {
            this.setState({ showModal : false })
          }} 
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});