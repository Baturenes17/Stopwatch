import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, Pressable, FlatList } from "react-native"
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export const Counter = () => {

    const [milliSeconds, setMilliSeconds] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [records, setRecords] = useState([]);

    var timer;

    useEffect(() => {

        if (isRunning) {
            timer = setInterval(() => {
                setMilliSeconds(milliSeconds + 1);
                if (milliSeconds == 99) {
                    setSeconds(seconds + 1);
                    setMilliSeconds(0);
                }
                if (seconds == 60) {
                    setMinutes(minutes + 1);
                    setSeconds(0);
                }
            }, 2)

            return () => clearInterval(timer);
        }

    })


    const startTimer = () => {
        if (isRunning == false) {
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
    }

    const reset = () => {
        setIsRunning(false);
        setMilliSeconds(0);
        setSeconds(0);
        setMinutes(0);
    }

    const saveRecords = () => {
        setRecords([...records, `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}:${milliSeconds < 10 ? "0" + milliSeconds : milliSeconds}`])
    }

    const cleanRecords = () => {
        setRecords([]);
    }



    return (
        <View style={styles.body} >

            <View style={styles.timerImg} >
                <Image source={require("../assets/counter.png")} style={{ width: 175, height: 175 }} />
            </View>

            <View style={styles.counter} >
                <Text style={styles.counterText} > {minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds} : {milliSeconds < 10 ? "0" + milliSeconds : milliSeconds} </Text>
            </View>

            <View style={styles.records} >
                <FlatList
                style={{flex:1}}
                    data={records}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ width: '90%', height: 50, borderWidth: 2, borderColor: "#6EBF5D", borderRadius: 20, justifyContent: "space-between", alignItems: "center", margin: 5, flexDirection: "row", paddingHorizontal: 20 }}>
                            <View style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 2, justifyContent: "center", alignItems: "center", borderColor: "#003953" }} ><Text style={{ fontSize: 17, fontWeight: "500" }}>{index + 1}</Text></View>
                            <Text style={{ margin: 5, fontSize: 30 }}>{item}</Text>
                        </View>
                    )}
                />
            </View>

            <View style={styles.buttonsArea} >
                <Pressable style={{ flex: 1 }} onPress={() => saveRecords()}>
                    <View style={styles.buttons} >
                        <Feather name="check-circle" size={40} color="black" />
                    </View>
                </Pressable>


                <Pressable style={{ flex: 1 }} onPress={() => startTimer()} >
                    <View style={styles.buttons} >
                        <Entypo name="stopwatch" size={40} color="black" />
                    </View>
                </Pressable>

                <Pressable style={{ flex: 1 }} onPress={() => [reset(), cleanRecords()]}>
                    <View style={styles.buttons} >
                        <FontAwesome6 name="creative-commons-zero" size={40} color="black" />
                    </View>
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        width: "100%"
    },
    timerImg: {
        flex: 2,
        //backgroundColor:"red",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60
    },
    counter: {
        flex: 1,
        //backgroundColor:"green",
        justifyContent: "center",
        alignItems: "center"
    },
    counterText: {
        fontSize: 25,
        fontWeight: "500"
    },
    records: {
        flex: 4,
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingRight: 20,
        paddingTop: 20,
        borderTopWidth:2,
        borderColor:"#003953"
        //backgroundColor: "blue"
    },
    buttonsArea: {
        flex: 0.7,
        //backgroundColor: "purple",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth:2,
        borderColor:"#003953"
    },
    buttons: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    }
})