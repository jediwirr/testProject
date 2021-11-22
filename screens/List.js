import React, { Component } from 'react';
import { Button, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setData } from '../store/actions';
import { styles } from '../styles/styles';

const Item = ({id, title, moveToDetails, deletePost}) => (
    <View style={styles.style}>
        <Text>{new Date().toString()}</Text>
        <TouchableOpacity onPress={() => moveToDetails(id)}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <Button title="DELETE POST" onPress={() => deletePost(id)} />
    </View>
);

class List extends Component {
    constructor() {
        super();
        this.state = ({
            limit: 5
        })
    };

    componentDidMount() {
        this.loadPosts(5);
    }

    loadPosts = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${this.state.limit}`)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            this.props.setData(response);
            console.log(this.props.data);
        })
        .catch(error => console.log(error));
    };

    moveToDetails = (id) => {
        this.props.navigation.navigate('Post', {id: id});
    }

    deletePost = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    endReachedHandle = () => {
        this.setState({
            limit: this.state.limit + 5
        });
        this.loadPosts();
    }

    renderItem = ({item}) => (
        <Item 
            id={item.id} 
            title={item.title} 
            moveToDetails={this.moveToDetails} 
            deletePost={this.deletePost} 
        />
    );

    render() {
        return(
            <FlatList
                data={this.props.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                onEndReached={this.endReachedHandle}
            />
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