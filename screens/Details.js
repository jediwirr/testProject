import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import {connect } from 'react-redux';
import { styles } from '../styles/styles';

class Details extends Component {
    constructor(props) {
        super(props);
        ({ id } = this.props.route.params);
        this.state = ({ comments: [] })
    }

    componentDidMount() {
        this.getComments();
    };

    getComments = async () => {
        await fetch(`http://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.setState({ comments: response });
        });
    }

    render() {
        return(
            <ScrollView>
                {
                    this.props.data.map(item => (
                        item.id != id ? <></> :
                            <View key={item.id} style={styles.style}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.body}>{item.body}</Text>
                            </View>
                    ))
                }
                <Text style={{ ...styles.title, textAlign: 'center'}}>Comments</Text>
                {
                    !this.state.comments ? 'No comments yet' :
                    this.state.comments.map(item => (
                        <View key={item.id} style={styles.style}>
                            <Text style={styles.commentTitle}>{item.name}</Text>
                            <Text>{item.email}</Text>
                            <Text>{item.body}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(Details);