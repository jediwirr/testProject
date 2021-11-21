import React, { Component } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { setData } from '../store/actions';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            date: new Date().toString()
        })
    };

    componentDidMount() {
        this._loadPosts()
    }

    mapStateToProps = (state) => {
        const { data } = state
        return { data: data }
    }

    _loadPosts = () => {
        fetch('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=5')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.props.setData(response);
        })
    }

    _moveToDetails = (id) => {
        this.props.navigation.navigate('Details', {id: id});
    }

    _deletePost = (id) => {
        fetch(`http://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }

    render() {
        return(
            <View>
                {
                    this.props.data.map(item => (
                        <View key={item.id} style={styles.style} accessible>
                        <TouchableOpacity onPress={() => this._moveToDetails(item.id)}>
                            <Text>{this.state.date}</Text>
                            <Text key={item.title} style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                        <Button title="DELETE POST" onPress={() => this._deletePost(item.id)} />
                        </View>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    style: {
        padding: 8,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default connect(mapStateToProps, { setData })(List);