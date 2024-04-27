import { useEffect, useState } from "react"
import { StyleSheet, View,Text,Image } from "react-native"

export const Counter = () => {

    const [milliSeconds,setMilliSeconds] = useState(0);
    const [seconds,setSeconds] = useState(0);
    const [minutes,setMinutes] = useState(0);

    var timer;

    useEffect(()=>{
        timer = setInterval(()=>{
            setMilliSeconds(milliSeconds+1);
            if(milliSeconds == 99){
                setSeconds(seconds+1);
                setMilliSeconds(0);
            }
            if(seconds==59){
                setMinutes(minutes+1);
                setSeconds(0);
            }
        },10)

        return()=>clearInterval(timer);
    })

    return(
        <View style={styles.body} >

            <View style={styles.timerImg} >
                <Image source={require("../assets/counter.png")} style={{width:175,height:175}} />
            </View>

            <View style={styles.counter} >
                <Text style={styles.counterText} > {minutes<10 ? "0" + minutes : minutes} : {seconds <10 ? "0" + seconds : seconds} : {milliSeconds} </Text>
            </View>

            <View style={styles.records} >

            </View>

            <View style={styles.buttonsArea} >

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        width:"100%"
    },
    timerImg:{
        flex:2,
        //backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:60
    },
    counter:{
        flex:1,
        //backgroundColor:"green",
        justifyContent:"center",
        alignItems:"center"
    },
    counterText:{
        fontSize:25,
        fontWeight:"500"
    },
    records:{
        flex:4,
        backgroundColor:"blue"
    },
    buttonsArea:{
        flex:1,
        backgroundColor:"purple"
    }
})