import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import DelecteButton from './DeleteButton'

const TodoItem = ({
    title,
    done,
    remove,
    toggle,
}) => {
    return (
        <Swipeable
            renderRightActions={() => <DelecteButton onPress={remove} />}
        >
            <View style={styles.container}>
                <View style={styles.todo}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={toggle}
                        style={done ? styles.done : styles.check}
                    >
                    <FontAwesome name="check" color={done ? '#FFFFFF' : '#6a1b9a'} size={14} />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#FFFFFF',
    },
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#6a1b9a',
    },
    title: {
        fontSize: 16,
        color: '#424242'
    },
    check: {
        borderWidth: 1,
        borderColor: '#6a1b9a',
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight : 8,
        borderRadius: 14,
    },
    done: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight : 8,
        borderRadius: 14,
        backgroundColor: '#6a1b9a',
    }
})

export default TodoItem