import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setData } from '../store/actions';
import { styles } from '../styles/styles';

class List extends Component {
    constructor() {
        super();
    };

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = () => {
        fetch('http://jsonplaceholder.typicode.com/posts?_start=0&_limit=5')
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            this.props.setData(response);
            console.log(this.props.data);
        })
    }

    moveToDetails = (id) => {
        this.props.navigation.navigate('Details', {id: id});
    }

    deletePost = (id) => {
        fetch(`http://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }

    render() {
        return(
            <ScrollView>
                {
                    !this.props.data ? <Text>'Loading...'</Text> : this.props.data.map(item => (
                        <View key={item.id} style={styles.style}>
                            <Text>{new Date().toString()}</Text>
                            <TouchableOpacity onPress={() => this.moveToDetails(item.id)}>
                                <Text key={item.title} style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                            <Button title="DELETE POST" onPress={() => this.deletePost(item.id)} />
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return { data: state.data };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setData: setData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);